"""Arma un video vertical de historia de terror a partir de imágenes, una voz y los tiempos de cada palabra.

Uso: python3 build_story.py config.json   (las rutas del config son relativas a la carpeta del config)

config.json:
  voice: archivo de audio de la narración
  words: JSON con [[palabra, inicio_seg], ...]
  out: archivo de salida
  shots: [[indice_palabra, imagen, z0, z1, [cx0,cy0], [cx1,cy1], temblor, gamma], ...]
         cada toma arranca cuando se dice esa palabra
  groups: [[desde, hasta], ...] palabras que van juntas en cada subtítulo
  red: textos de subtítulo que van en rojo
  big: textos que van en grande (golpes)
  hits: indices de palabra donde va un golpe de sonido con flash
  silence: [desde_idx, hasta_idx] tramo donde se corta la música (opcional)
  heartbeat: indice de palabra donde empiezan los latidos (opcional)
  rumble: [desde_idx, hasta_idx] tramo con ruido grave creciente (opcional)
  fix: {indice: "TEXTO"} para corregir palabras de la transcripción
  speed: acelera la voz (1.0 = normal)
"""
import json, os, subprocess, sys

FPS = 30
FONT = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"


def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y"] + args, check=True)


def main(cfg_path):
    base = os.path.dirname(os.path.abspath(cfg_path))
    os.chdir(base)
    c = json.load(open(cfg_path))
    words = json.load(open(c["words"]))
    S = c.get("speed", 1.0)
    W = [(w.strip().upper().rstrip(","), s / S) for w, s in words]
    for k, v in c.get("fix", {}).items():
        W[int(k)] = (v, W[int(k)][1])
    end = round(W[-1][1] + c.get("tail", 2.4), 2)
    t = lambda i: W[i][1]

    run(["-i", c["voice"], "-af",
         f"atempo={S},aresample=44100,pan=mono|c0=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,"
         f"aecho=0.8:0.6:40:0.12,apad=whole_dur={end}", "-t", str(end), "_voice.wav"])

    files = []
    shots = c["shots"]
    for i, (wi, img, z0, z1, c0, c1, sh, gm) in enumerate(shots):
        a = 0.0 if i == 0 else max(0.0, t(wi) - 0.05)
        b = (t(shots[i + 1][0]) - 0.05) if i + 1 < len(shots) else end
        n = round(b * FPS) - round(a * FPS)
        p = f"(on/{n})"; e = f"({p}*{p}*(3-2*{p}))"
        z = f"({z0}+({z1}-{z0})*{e})"
        cx = f"({c0[0]}+({c1[0]}-{c0[0]})*{e})"; cy = f"({c0[1]}+({c1[1]}-{c0[1]})*{e})"
        sx = f"+{sh}*sin(on*1.9)" if sh else ""; sy = f"+{sh}*cos(on*2.3)" if sh else ""
        vf = (f"eq=gamma={gm}:contrast=1.08:saturation=1.1,scale=2304:4128,"
              f"zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{cx}*iw-iw/zoom/2{sx}))'"
              f":y='max(0,min(ih-ih/zoom,{cy}*ih-ih/zoom/2{sy}))':d={n}:s=1080x1920:fps={FPS},format=yuv420p")
        out = f"_shot{i:02d}.mp4"; files.append(out)
        run(["-loop", "1", "-i", img, "-vf", vf, "-frames:v", str(n), "-c:v", "libx264", "-crf", "18", out])
    open("_list.txt", "w").write("".join(f"file '{f}'\n" for f in files))
    run(["-f", "concat", "-safe", "0", "-i", "_list.txt", "-c", "copy", "_base.mp4"])

    red, big = set(c.get("red", [])), set(c.get("big", []))
    dt = []
    groups = c["groups"]
    for k, (a, b) in enumerate(groups):
        txt = " ".join(w for w, _ in W[a:b]).replace("'", "")
        st = t(a)
        en = t(groups[k + 1][0]) if k + 1 < len(groups) else end
        en = min(en, st + 2.4)
        isbig = txt in big
        col = "#E0322B" if txt in red else "white"
        s1 = min(150 if isbig else 108, int(1000 / (0.66 * len(txt))))
        s0 = int(s1 * 0.74)
        y = "h*0.13" if isbig else "h*0.17"
        dt.append(f"drawtext=fontfile={FONT}:text='{txt}':fontsize='if(lt(t-{st:.2f},0.1),{s0}+{s1-s0}*(t-{st:.2f})/0.1,{s1})'"
                  f":fontcolor={col}:borderw=8:bordercolor=black:x=(w-text_w)/2:y={y}:enable='gte(t,{st:.2f})*lt(t,{en:.2f})'")
    hits = [t(i) for i in c.get("hits", [])]
    for h in hits:
        dt.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.85:t=fill:enable='gte(t,{h:.2f})*lt(t,{h+0.07:.2f})'")

    sil = c.get("silence")
    s_on, s_off = (t(sil[0]), t(sil[1])) if sil else (end + 1, end + 2)
    drone_gate = f"(1-gt(t,{s_on:.2f})*lt(t,{s_off:.2f}))"
    bed = (f"0.13*(sin(2*PI*55*t)+0.6*sin(2*PI*82.4*t)+0.3*sin(2*PI*110.7*t))*(0.75+0.25*sin(2*PI*0.3*t))"
           f"*min(1,t/1.5)*(1+0.4*t/{end})*{drone_gate}+0.03*(random(0)*2-1)*{drone_gate}")
    if "heartbeat" in c:
        b0 = t(c["heartbeat"]) + 0.1; beats = [b0]
        for g in [0.75, 0.7, 0.62, 0.55]:
            beats.append(beats[-1] + g)
        bed += "+" + "+".join(f"0.8*sin(2*PI*48*(t-{b:.2f}))*exp(-(t-{b:.2f})*16)*gt(t,{b:.2f})" for b in beats)
    if "rumble" in c:
        r0, r1 = t(c["rumble"][0]), t(c["rumble"][1])
        bed += (f"+0.35*min(1,(t-{r0:.2f})/2)*(sin(2*PI*(33+6*(t-{r0:.2f}))*t)*0.7+0.4*(random(2)*2-1))"
                f"*gt(t,{r0:.2f})*lt(t,{r1:.2f})")
    for h in hits:
        bed += (f"+0.95*sin(2*PI*36*(t-{h:.2f}))*exp(-(t-{h:.2f})*1.3)*gt(t,{h:.2f})"
                f"+0.6*(random(1)*2-1)*exp(-(t-{h:.2f})*5)*gt(t,{h:.2f})")
    run(["-i", "_base.mp4", "-i", "_voice.wav", "-f", "lavfi", "-i", f"aevalsrc='{bed}':s=44100:d={end}",
         "-filter_complex", f"[0:v]{','.join(dt)}[v];[2:a]lowpass=f=2500,volume=0.5[b];[1:a]volume=1.1[n];"
                            f"[n][b]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]",
         "-map", "[v]", "-map", "[a]", "-t", str(end), "-c:v", "libx264", "-crf", "20", "-preset", "medium",
         "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", c["out"]])
    for f in files + ["_list.txt", "_base.mp4", "_voice.wav"]:
        os.remove(f)
    print("listo:", c["out"], end, "s")


if __name__ == "__main__":
    main(sys.argv[1])
