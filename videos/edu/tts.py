"""Genera la narración con ElevenLabs (voz de Alonso) y los tiempos de cada palabra.
Uso: ELEVEN_KEY_FILE=<archivo con la clave> python3 tts.py <carpeta>   (lee <carpeta>/texto.txt)
Escribe voz.mp3 y words.json en la carpeta. "upper" en texto.txt: palabras que se muestran en mayúsculas."""
import base64, json, os, sys, urllib.request

VOICE = os.environ.get("ELEVEN_VOICE", "WxS1WEvgNXJQOu1tpbLG")  # Alonso Quijano
d = sys.argv[1]
lines = open(os.path.join(d, "texto.txt"), encoding="utf-8").read().split("\n")
upper = set()
if lines and lines[0].startswith("upper:"):
    upper = {w.strip().lower() for w in lines.pop(0)[6:].split(",") if w.strip()}
text = "\n".join(lines).strip()
key = open(os.environ["ELEVEN_KEY_FILE"]).read().strip()
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128",
    data=json.dumps({"text": text, "model_id": "eleven_multilingual_v2",
                     "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.25}}).encode(),
    headers={"xi-api-key": key, "Content-Type": "application/json"})
r = json.load(urllib.request.urlopen(req, timeout=120))
open(os.path.join(d, "voz.mp3"), "wb").write(base64.b64decode(r["audio_base64"]))
al = r["alignment"]
words, cur, start = [], "", None
for ch, t in zip(al["characters"], al["character_start_times_seconds"]):
    if ch.isspace():
        if cur: words.append([cur, start]); cur = ""
        continue
    if not cur: start = t
    cur += ch
if cur: words.append([cur, start])
for k in upper:  # solo la última aparición (la del "Comenta ...")
    hits = [w for w in words if w[0].strip('.,:;!?"“”').lower() == k]
    if hits: hits[-1][0] = hits[-1][0].replace(hits[-1][0].strip('.,:;!?"“”'), k.upper())
json.dump(words, open(os.path.join(d, "words.json"), "w"), ensure_ascii=False)
print(len(words), "palabras,", round(words[-1][1], 1), "s")
