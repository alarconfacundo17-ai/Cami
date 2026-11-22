import subprocess, json
FPS=30; F="/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"; S=1.1
def run(a): subprocess.run(["ffmpeg","-v","error","-y"]+a,check=True)
PAUSE_AT, PAUSE=37.5, 0.6          # silence before the final reveal (original-time)
def adj(t): return t/S + (PAUSE if t>=PAUSE_AT else 0)
END=round(adj(39.3)+2.0,2)
# voice: speed up, insert pause
run(["-i","voz2.mp3","-filter_complex",
 f"[0:a]atempo={S},asplit[a][b];[a]atrim=end={PAUSE_AT/S},asetpts=PTS-STARTPTS[p1];[b]atrim=start={PAUSE_AT/S},asetpts=PTS-STARTPTS[p2];"
 f"anullsrc=r=44100:cl=mono,atrim=duration={PAUSE}[z];[p1][z][p2]concat=n=3:v=0:a=1,aresample=44100,pan=mono|c0=c0,"
 f"acompressor=threshold=-20dB:ratio=3:attack=5:release=120,aecho=0.8:0.6:40:0.12,apad=whole_dur={END}[v]",
 "-map","[v]","-t",str(END),"voz2_adj.wav"])
M=(0.52,0.41); R5=(0.52,0.47); R9=(0.66,0.47); EY=(0.50,0.49); G=(0.58,0.49); L7=(0.48,0.52)
# (orig_start, img, z0, z1, c0, c1, shake, gamma)
shots=[(0.0,"r5.png",1.0,1.15,(0.5,0.5),R5,2,1.45),
(1.75,"r5.png",1.5,1.8,R5,R5,3,1.45),
(4.1,"r1.png",1.0,1.2,(0.5,0.45),(0.57,0.68),0,1.15),
(6.7,"r3.png",1.0,1.2,(0.5,0.55),(0.5,0.5),0,1.3),
(9.4,"r1.png",1.6,1.7,(0.2,0.55),(0.3,0.55),0,1.2),
(10.45,"r2.png",1.0,1.25,(0.5,0.5),(0.52,0.45),0,1.35),
(11.7,"r2.png",1.9,2.2,M,M,0,1.4),
(13.7,"r7.png",1.0,1.35,(0.5,0.6),L7,0,1.05),
(17.3,"r4.png",1.0,1.3,(0.5,0.5),G,0,1.2),
(19.1,"r2.png",2.2,2.4,M,M,2,1.4),
(20.35,"r4.png",1.5,1.8,G,G,5,1.2),
(21.55,"r2.png",2.4,2.6,M,M,4,1.4),
(22.75,"r8.png",1.0,1.3,(0.5,0.5),EY,0,1.15),
(24.0,"r2_off.png",2.6,2.65,M,M,3,1.45),
(25.75,"r2_off.png",1.2,1.45,(0.5,0.45),(0.52,0.42),1,1.5),
(28.4,"r6.png",2.0,2.3,(0.56,0.55),(0.56,0.58),0,1.25),
(30.8,"r6.png",2.6,2.9,(0.56,0.6),(0.56,0.62),2,1.25),
(31.7,"r5.png",1.25,1.6,R5,R5,7,1.45),
(32.9,"r8.png",1.5,1.9,EY,EY,2,1.15),
(35.5,"r9.png",1.0,1.4,(0.5,0.5),R9,0,1.45),
(37.75,"r9.png",2.0,2.6,R9,(0.70,0.47),5,1.5)]
files=[]
for i,(st,img,z0,z1,c0,c1,sh,gm) in enumerate(shots):
    a=adj(st); b=adj(shots[i+1][0]) if i+1<len(shots) else END
    N=round(b*FPS)-round(a*FPS); p=f"(on/{N})"; e=f"({p}*{p}*(3-2*{p}))"
    z=f"({z0}+({z1}-{z0})*{e})"; cx=f"({c0[0]}+({c1[0]}-{c0[0]})*{e})"; cy=f"({c0[1]}+({c1[1]}-{c0[1]})*{e})"
    sx=f"+{sh}*sin(on*1.9)" if sh else ""; sy=f"+{sh}*cos(on*2.3)" if sh else ""
    vf=(f"eq=gamma={gm}:contrast=1.08:saturation=1.1,scale=2304:4128,zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{cx}*iw-iw/zoom/2{sx}))'"
        f":y='max(0,min(ih-ih/zoom,{cy}*ih-ih/zoom/2{sy}))':d={N}:s=1080x1920:fps={FPS},format=yuv420p")
    out=f"s3_{i:02d}.mp4"; files.append(out)
    run(["-loop","1","-i",img,"-vf",vf,"-frames:v",str(N),"-c:v","libx264","-crf","18",out])
open("list3.txt","w").write("".join(f"file '{f}'\n" for f in files))
run(["-f","concat","-safe","0","-i","list3.txt","-c","copy","base3.mp4"])
# captions (word, orig start)
caps_src=json.load(open("words2.json"))
W=[(w.strip().upper().rstrip(","),s) for w,s in caps_src]
groups=[(0,4),(4,7),(7,9),(9,11),(11,15),(15,18),(18,21),(21,23),(23,25),(25,28),(28,29),(29,31),(31,32),(32,35),(35,37),(37,39),(39,40),(40,42),(42,43),(43,45),(45,46),(46,48),(48,51),(51,54),(54,56),(56,58),(58,60),(60,62),(62,64),(64,67),(67,70),(70,73),(73,74),(74,76),(76,78)]
RED={"NO FRENES.","DOS LUCES","SE APAGAN.","UN MOTOR","MÁS CERCA","DEL ASIENTO","DE ATRÁS."}
dt=[]
for k,(a,b) in enumerate(groups):
    t=" ".join(w for w,_ in W[a:b]); st=adj(W[a][1])
    en=adj(W[groups[k+1][0]][1]) if k+1<len(groups) else END
    en=min(en,st+2.4)
    big=t in("MÁS CERCA","DEL ASIENTO","DE ATRÁS."); col="#E0322B" if t in RED else "white"
    s1=(min(150,int(1000/(0.66*len(t)))) if big else min(108,int(980/(0.66*len(t))))); s0=int(s1*0.74)
    y=("h*0.13" if t!="MÁS CERCA" else "(h-text_h)/2") if big else "h*0.17"
    dt.append(f"drawtext=fontfile={F}:text='{t}':fontsize='if(lt(t-{st:.2f},0.1),{s0}+{s1-s0}*(t-{st:.2f})/0.1,{s1})':fontcolor={col}"
              f":borderw=8:bordercolor=black:x=(w-text_w)/2:y={y}:enable='gte(t,{st:.2f})*lt(t,{en:.2f})'")
hit1=adj(31.74); hit2=adj(38.24); off=adj(24.08); back=adj(25.8); mot=adj(28.48)
for h in (hit1,hit2):
    dt.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.85:t=fill:enable='gte(t,{h:.2f})*lt(t,{h+0.07:.2f})'")
beats=[back+0.1]
for gap in [0.75,0.7,0.62,0.55]: beats.append(beats[-1]+gap)
hb="+".join(f"0.8*sin(2*PI*48*(t-{b:.2f}))*exp(-(t-{b:.2f})*16)*gt(t,{b:.2f})" for b in beats)
def boom(h,amp=0.95): return f"+{amp}*sin(2*PI*36*(t-{h:.2f}))*exp(-(t-{h:.2f})*1.3)*gt(t,{h:.2f})+0.6*(random(1)*2-1)*exp(-(t-{h:.2f})*5)*gt(t,{h:.2f})"
bed=(f"0.14*(sin(2*PI*55*t)+0.6*sin(2*PI*82.4*t)+0.3*sin(2*PI*110.7*t))*(0.75+0.25*sin(2*PI*0.3*t))*min(1,t/1.5)*(1+0.5*t/{off})*lt(t,{off})"
     f"+0.03*(random(0)*2-1)*lt(t,{off})+{hb}"
     f"+0.35*min(1,(t-{mot})/2)*(sin(2*PI*(33+6*(t-{mot}))*t)*0.7+0.4*(random(2)*2-1))*gt(t,{mot})*lt(t,{hit1})"
     + boom(hit1) +
     f"+0.12*(sin(2*PI*49*t)+0.7*sin(2*PI*51.5*t))*gt(t,{hit1+1.2})*lt(t,{hit2})*min(1,(t-{hit1+1.2})/1.5)"
     + boom(hit2,1.0) +
     f"+0.25*sin(2*PI*1200*(t-{hit2:.2f}))*exp(-(t-{hit2:.2f})*2.5)*gt(t,{hit2:.2f})*(0.5+0.5*sin(2*PI*7*t))")
run(["-i","base3.mp4","-i","voz2_adj.wav","-f","lavfi","-i",f"aevalsrc='{bed}':s=44100:d={END}",
     "-filter_complex",f"[0:v]{','.join(dt)}[v];[2:a]lowpass=f=2500,volume=0.5[b];[1:a]volume=1.1[n];[n][b]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]",
     "-map","[v]","-map","[a]","-t",str(END),"-c:v","libx264","-crf","20","-preset","medium","-c:a","aac","-b:a","192k","-movflags","+faststart","ruta40_v2.mp4"])
print("END",END)
