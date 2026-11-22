import subprocess
FPS=30; F="/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"; END=31.0
def run(a): subprocess.run(["ffmpeg","-v","error","-y"]+a,check=True)
INS=[(18.27,0.5),(19.87,1.0),(23.88,0.6),(24.95,0.6)]
def adj(t): return t+sum(d for T,d in INS if t>=T)
# --- voice with dramatic pauses
cuts=[0]+[T for T,_ in INS]+[None]
parts=[];fc=[]
for i in range(len(cuts)-1):
    a,b=cuts[i],cuts[i+1]
    fc.append(f"[0:a]atrim=start={a}"+(f":end={b}" if b else "")+f",asetpts=PTS-STARTPTS[s{i}]")
    parts.append(f"[s{i}]")
    if i<len(INS): fc.append(f"anullsrc=r=44100:cl=mono,atrim=duration={INS[i][1]}[z{i}]"); parts.append(f"[z{i}]")
fc.append(f"{''.join(parts)}concat=n={len(parts)}:v=0:a=1,aresample=44100,pan=mono|c0=c0,apad=whole_dur={END}[v]")
run(["-i","voz.mp3","-filter_complex",";".join(fc),"-map","[v]","-t",str(END),"voz_adj.wav"])
# --- shots: (start, img, z0, z1, c0, c1, shake)
M=(0.52,0.41)
shots=[(0.0,"r1.png",1.0,1.25,(0.5,0.45),(0.57,0.68),0),
(2.95,"r3.png",1.0,1.2,(0.5,0.55),(0.5,0.5),0),
(5.85,"r1.png",1.6,1.7,(0.2,0.55),(0.3,0.55),0),
(7.0,"r3.png",1.5,1.6,(0.8,0.4),(0.7,0.4),0),
(7.8,"r3.png",1.3,1.25,(0.5,0.47),(0.5,0.47),0),
(8.6,"r2.png",1.0,1.25,(0.5,0.5),(0.52,0.45),0),
(10.15,"r2.png",1.9,2.1,M,M,0),
(11.8,"r2.png",2.4,2.6,M,M,0),
(14.65,"r4.png",1.0,1.3,(0.5,0.5),(0.58,0.49),0),
(16.9,"r2.png",2.1,2.4,M,M,4),
(adj(18.3),"r2.png",2.4,2.5,M,M,2),
(adj(19.28),"r2_off.png",2.5,2.55,M,M,3),
(adj(19.9),"r2_off.png",2.55,2.75,M,M,1),
(adj(21.96),"r6.png",2.0,2.3,(0.56,0.55),(0.56,0.58),0),
(adj(24.0),"r5.png",1.0,1.35,(0.5,0.45),(0.52,0.45),6),
(adj(25.3),"r5.png",1.35,1.42,(0.52,0.45),(0.52,0.45),1)]
files=[]
for i,(st,img,z0,z1,c0,c1,sh) in enumerate(shots):
    en=shots[i+1][0] if i+1<len(shots) else END
    N=round(en*FPS)-round(st*FPS); p=f"(on/{N})"; e=f"({p}*{p}*(3-2*{p}))"
    z=f"({z0}+({z1}-{z0})*{e})"; cx=f"({c0[0]}+({c1[0]}-{c0[0]})*{e})"; cy=f"({c0[1]}+({c1[1]}-{c0[1]})*{e})"
    sx=f"+{sh}*sin(on*1.9)" if sh else ""; sy=f"+{sh}*cos(on*2.3)" if sh else ""
    vf=(f"scale=2304:4128,zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{cx}*iw-iw/zoom/2{sx}))'"
        f":y='max(0,min(ih-ih/zoom,{cy}*ih-ih/zoom/2{sy}))':d={N}:s=1080x1920:fps={FPS},format=yuv420p")
    if i==len(shots)-1: vf+=",eq=brightness=-0.08"
    out=f"shot{i:02d}.mp4"; files.append(out)
    run(["-loop","1","-i",img,"-vf",vf,"-frames:v",str(N),"-c:v","libx264","-crf","18",out])
open("list2.txt","w").write("".join(f"file '{f}'\n" for f in files))
run(["-f","concat","-safe","0","-i","list2.txt","-c","copy","base2.mp4"])
# --- captions from word timings
W=[("RUTA",0.10),("40",0.72),("TRES",1.34),("DE",1.56),("LA",1.68),("MAÑANA.",1.80),("HACE",3.02),("200",3.40),("KM",3.84),("QUE",4.38),("NO",4.50),("VES",4.64),("OTRO",4.86),("AUTO",5.12),
("NI",5.90),("UNA",6.04),("CASA",6.28),("NI",7.06),("UNA",7.22),("LUZ",7.40),("NADA.",7.86),("HASTA",8.68),("QUE",8.96),("EN",9.04),("EL",9.12),("ESPEJO",9.24),("APARECEN",10.22),("DOS",10.72),("LUCES",10.92),
("LEJOS",11.84),("SIEMPRE",12.68),("A",12.98),("LA",13.06),("MISMA",13.18),("DISTANCIA.",13.44),("BAJÁS",14.70),("LA",15.02),("VELOCIDAD",15.14),("ELLAS",16.22),("TAMBIÉN.",16.52),("ACELERÁS",16.96),("ELLAS",17.66),("TAMBIÉN.",17.92),
("ENTONCES",18.30),("SE",19.28),("APAGAN.",19.38),("MIRÁS",19.90),("EL",20.22),("ESPEJO",20.32),("NO",20.82),("HAY",20.90),("NADA",21.06),("PERO",21.96),("ESCUCHÁS",22.10),("UN",22.62),("MOTOR",22.74),("CADA",23.32),("VEZ",23.56),
("MÁS",24.00),("CERCA.",24.24),("¿VOS",25.30),("FRENABAS",25.56),("O",26.34),("ACELERABAS?",26.44)]
groups=[(0,2),(2,6),(6,9),(9,12),(12,14),(14,17),(17,20),(20,21),(21,23),(23,26),(26,27),(27,29),(29,30),(30,33),(33,35),(35,37),(37,38),(38,40),(40,41),(41,43),(43,44),(44,46),(46,49),(49,52),(52,54),(54,56),(56,58),(58,60),(60,62),(62,64)]
RED={"DOS LUCES","SE APAGAN.","UN MOTOR","MÁS CERCA."}
caps=[]
for k,(a,b) in enumerate(groups):
    txt=" ".join(w for w,_ in W[a:b]); st=adj(W[a][1])
    en=adj(W[groups[k+1][0]][1]) if k+1<len(groups) else END
    caps.append((txt,st,min(en,st+2.2)))
dt=[]
for t,a,b in caps:
    big=t=="MÁS CERCA."; col="#E0322B" if t in RED else "white"
    s1=165 if big else min(108,int(980/(0.66*len(t)))); s0=int(s1*0.74)
    y="(h-text_h)/2" if big else "h*0.17"
    dt.append(f"drawtext=fontfile={F}:text='{t}':fontsize='if(lt(t-{a:.2f},0.1),{s0}+{s1-s0}*(t-{a:.2f})/0.1,{s1})':fontcolor={col}"
              f":borderw=8:bordercolor=black:x=(w-text_w)/2:y={y}:enable='gte(t,{a:.2f})*lt(t,{b:.2f})'")
# white flash at the "más cerca" hit
hit=adj(24.0)
dt.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.85:t=fill:enable='gte(t,{hit:.2f})*lt(t,{hit+0.07:.2f})'")
# --- sound bed
off=adj(19.28); back=adj(19.9); mot=adj(21.96); fin=adj(25.3)
beats=[back+0.15+i*x for i,x in enumerate([0,0.75,0.7,0.62,0.55,0.5])]
beats=[back+0.15]; 
for gap in [0.75,0.7,0.62,0.55]: beats.append(beats[-1]+gap)
hb="+".join(f"0.8*sin(2*PI*48*(t-{b:.2f}))*exp(-(t-{b:.2f})*16)*gt(t,{b:.2f})" for b in beats)
bed=(f"0.14*(sin(2*PI*55*t)+0.6*sin(2*PI*82.4*t)+0.3*sin(2*PI*110.7*t))*(0.75+0.25*sin(2*PI*0.3*t))*min(1,t/2)*(1+0.5*t/{off})*lt(t,{off})"
     f"+0.035*(random(0)*2-1)*lt(t,{off})"
     f"+{hb}"
     f"+0.35*min(1,(t-{mot})/2.5)*(sin(2*PI*(33+6*(t-{mot}))*t)*0.7+0.4*(random(2)*2-1))*gt(t,{mot})*lt(t,{hit})"
     f"+0.95*sin(2*PI*36*(t-{hit}))*exp(-(t-{hit})*1.3)*gt(t,{hit})+0.6*(random(1)*2-1)*exp(-(t-{hit})*5)*gt(t,{hit})"
     f"+0.08*(sin(2*PI*55*t)+0.5*sin(2*PI*58.3*t))*gt(t,{fin})*max(0,1-(t-{fin})/3)")
run(["-i","base2.mp4","-i","voz_adj.wav","-f","lavfi","-i",f"aevalsrc='{bed}':s=44100:d={END}",
     "-filter_complex",f"[0:v]{','.join(dt)}[v];[2:a]lowpass=f=1600,volume=0.55[b];[1:a]volume=1.0[n];[n][b]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]",
     "-map","[v]","-map","[a]","-t",str(END),"-c:v","libx264","-crf","20","-preset","medium","-c:a","aac","-b:a","192k","-movflags","+faststart","ruta40_final.mp4"])
