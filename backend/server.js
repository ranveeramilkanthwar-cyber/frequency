const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); app.use(express.json());

const tracks = [
  { id:1,title:"Neon Horizon",artist:"Synthwave Collective",genre:"Synthwave",bpm:128,duration:245,key:"F minor",mood:"nostalgic",year:2024,waveColor:"#6366f1",bgGradient:["#0f0c29","#302b63","#24243e"],plays:284710,liked:18429 },
  { id:2,title:"Pulse Protocol",artist:"DataDrift",genre:"Techno",bpm:145,duration:312,key:"G minor",mood:"intense",year:2024,waveColor:"#ef4444",bgGradient:["#000000","#200122","#6f0000"],plays:156234,liked:9871 },
  { id:3,title:"Aquatic Dreams",artist:"Oceanic",genre:"Ambient",bpm:72,duration:428,key:"D major",mood:"serene",year:2024,waveColor:"#06b6d4",bgGradient:["#0c3547","#001e3c","#0a2240"],plays:489012,liked:31204 },
  { id:4,title:"Grid Runner",artist:"CyberPulse",genre:"Electro",bpm:138,duration:198,key:"A minor",mood:"energetic",year:2024,waveColor:"#22c55e",bgGradient:["#000000","#0a2e0a","#052e0a"],plays:203847,liked:12654 },
  { id:5,title:"Starfield Drift",artist:"Cosmix",genre:"Space Ambient",bpm:58,duration:521,key:"E major",mood:"transcendent",year:2024,waveColor:"#a855f7",bgGradient:["#000000","#0d0221","#190035"],plays:672341,liked:45123 },
  { id:6,title:"Circuit Breaker",artist:"VoltCore",genre:"Industrial",bpm:162,duration:267,key:"B minor",mood:"aggressive",year:2024,waveColor:"#f97316",bgGradient:["#1a0000","#3d0000","#1a0000"],plays:98234,liked:6543 }
];

const visualizerPresets = [
  { id:"bars",name:"Frequency Bars",description:"Classic spectrum analyzer bars" },
  { id:"circular",name:"Circular Wave",description:"Rotating waveform ring" },
  { id:"particles",name:"Sound Particles",description:"Particles explode to the beat" },
  { id:"terrain",name:"Audio Terrain",description:"3D landscape shaped by sound" },
  { id:"oscilloscope",name:"Oscilloscope",description:"Raw waveform visualization" }
];

app.get("/api/tracks", (req,res) => {
  let r = [...tracks];
  if(req.query.genre) r = r.filter(t=>t.genre.toLowerCase()===req.query.genre.toLowerCase());
  if(req.query.mood) r = r.filter(t=>t.mood===req.query.mood);
  if(req.query.sort==="plays") r.sort((a,b)=>b.plays-a.plays);
  if(req.query.sort==="bpm") r.sort((a,b)=>b.bpm-a.bpm);
  res.json({success:true,data:r});
});
app.get("/api/tracks/:id", (req,res) => {
  const t = tracks.find(t=>t.id===parseInt(req.params.id));
  if(!t) return res.status(404).json({error:"Track not found"});
  res.json({success:true,data:t});
});
app.get("/api/visualizers", (req,res) => res.json({success:true,data:visualizerPresets}));
app.get("/api/genres", (req,res) => res.json({success:true,data:[...new Set(tracks.map(t=>t.genre))]}));
app.post("/api/like/:id", (req,res) => {
  const t = tracks.find(t=>t.id===parseInt(req.params.id));
  if(!t) return res.status(404).json({error:"Not found"});
  t.liked++;
  res.json({success:true,liked:t.liked});
});
app.get("/api/stats", (req,res) => res.json({success:true,stats:{totalTracks:tracks.length,totalPlays:tracks.reduce((s,t)=>s+t.plays,0),totalLikes:tracks.reduce((s,t)=>s+t.liked,0),avgBpm:Math.round(tracks.reduce((s,t)=>s+t.bpm,0)/tracks.length),genres:[...new Set(tracks.map(t=>t.genre))].length}}));
app.listen(3005, ()=>console.log("FREQUENCY backend running on http://localhost:3005"));
