import { useState, useEffect, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const SKILL_ICONS = ["🎸","🎹","💻","🎨","📸","✍️","🗣️","🏋️","🧘","📐","🎭","🍳","📊","🎯","🔬","🎬","📚","🧩"];
const CATEGORIES = ["Creative","Tech","Fitness","Language","Music","Business","Science","Other"];
const CAT_COLORS = { Creative:"#E8A87C", Tech:"#60A5FA", Fitness:"#6EE7B7", Language:"#F9A8D4", Music:"#C4B5FD", Business:"#FCD34D", Science:"#67E8F9", Other:"#D1D5DB" };

const MILESTONES = [
  { hours: 10,  label: "Beginner",     badge: "🥉", color: "#CD7F32" },
  { hours: 25,  label: "Apprentice",   badge: "⚡", color: "#60A5FA" },
  { hours: 50,  label: "Intermediate", badge: "🥈", color: "#94A3B8" },
  { hours: 100, label: "Advanced",     badge: "🥇", color: "#F59E0B" },
  { hours: 200, label: "Expert",       badge: "💎", color: "#A78BFA" },
  { hours: 500, label: "Master",       badge: "🏆", color: "#10B981" },
];

const getMilestone = (hours) => {
  let m = null;
  for (const ms of MILESTONES) { if (hours >= ms.hours) m = ms; }
  return m;
};
const getNextMilestone = (hours) => MILESTONES.find(m => hours < m.hours) || null;

const fmtHours = (mins) => {
  const h = Math.floor(mins / 60); const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const getToday = () => new Date().toISOString().split("T")[0];
const getLast14Days = () => {
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const bg = type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#E8A87C";
  return (
    <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:bg, color:"#fff", padding:"10px 22px", borderRadius:30, fontSize:13, fontWeight:700, zIndex:999, whiteSpace:"nowrap", boxShadow:`0 8px 24px ${bg}66`, animation:"fadeSlideUp 0.3s ease" }}>
      {message}
    </div>
  );
}

// ── Welcome Screen ─────────────────────────────────────────────────────────
function WelcomeScreen({ onSave }) {
  const [name, setName] = useState("");
  return (
    <div style={{ minHeight:"100vh", background:"#0D1A12", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px) translateX(-50%)} to{opacity:1;transform:translateY(0) translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .w-input { background:#1A2E20; border:1.5px solid #2D4A35; border-radius:14px; color:#F0EBD8; font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; padding:14px 18px; width:100%; outline:none; transition:border 0.2s; text-align:center; }
        .w-input:focus { border-color:#6EE7B7; }
        .w-btn { width:100%; background:linear-gradient(135deg,#6EE7B7,#059669); color:#0D1A12; border:none; border-radius:14px; padding:15px; font-size:16px; font-weight:700; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.2s; }
        .w-btn:hover { transform:scale(1.02); box-shadow:0 8px 28px rgba(110,231,183,0.4); }
        .w-btn:disabled { opacity:0.35; cursor:not-allowed; transform:none; }
      `}</style>
      <div style={{ position:"absolute", width:280, height:280, background:"#6EE7B7", borderRadius:"50%", filter:"blur(100px)", opacity:0.08, top:-80, left:-80, pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:200, height:200, background:"#E8A87C", borderRadius:"50%", filter:"blur(80px)", opacity:0.08, bottom:-60, right:-60, pointerEvents:"none" }} />
      <div style={{ background:"#111D16", border:"1px solid #1E3326", borderRadius:28, padding:"44px 32px", width:"100%", maxWidth:400, textAlign:"center", animation:"slideUp 0.6s ease" }}>
        <div style={{ fontSize:60, marginBottom:18, animation:"float 3s ease-in-out infinite" }}>🎯</div>
        <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:30, fontWeight:800, color:"#F0EBD8", marginBottom:8 }}>
          Track Your Mastery
        </h1>
        <p style={{ color:"#5A7A64", fontSize:14, marginBottom:32, lineHeight:1.7 }}>
          Every expert was once a beginner.<br />Let's track your journey to mastery.
        </p>
        <input className="w-input" placeholder="What's your name?" value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && name.trim() && (localStorage.setItem("skill_user_name", name.trim()), onSave(name.trim()))}
          autoFocus style={{ marginBottom:14 }} />
        <button className="w-btn" disabled={!name.trim()}
          onClick={() => { localStorage.setItem("skill_user_name", name.trim()); onSave(name.trim()); }}>
          Start My Journey 🚀
        </button>
        <p style={{ marginTop:18, fontSize:11, color:"#2D4A35" }}>Saved locally on your device</p>
      </div>
    </div>
  );
}

// ── Mini Bar Chart ─────────────────────────────────────────────────────────
function ActivityChart({ sessions, color }) {
  const days = getLast14Days();
  const maxMins = Math.max(...days.map(d => sessions.filter(s => s.date === d).reduce((sum, s) => sum + s.duration, 0)), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:48 }}>
      {days.map(d => {
        const mins = sessions.filter(s => s.date === d).reduce((sum, s) => sum + s.duration, 0);
        const pct = mins / maxMins;
        return (
          <div key={d} title={`${fmtHours(mins)}`} style={{ flex:1, height:Math.max(pct * 48, mins > 0 ? 4 : 2), background: mins > 0 ? color : "#1E3326", borderRadius:3, transition:"height 0.5s ease", cursor:"default" }} />
        );
      })}
    </div>
  );
}

// ── AI Resources Panel ─────────────────────────────────────────────────────
function AIResources({ skill, onClose }) {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    messages: [{
      role: "user",
      content: `You are a learning advisor. For the skill "${skill.name}" (category: ${skill.category}), the learner has spent ${fmtHours(skill.totalMins)} learning so far. Return ONLY raw JSON no markdown no backticks: {"level":"beginner|intermediate|advanced","tip":"one short personalized tip based on their current hours","resources":[{"type":"Book","title":"...","why":"one sentence why"},{"type":"YouTube","title":"...","why":"one sentence why"},{"type":"Website","title":"...","why":"one sentence why"},{"type":"Practice","title":"...","why":"one sentence why"}],"nextGoal":"a specific actionable next milestone for them"}`
    }]
  })
});
const data = await response.json();
const text = data.choices?.[0]?.message?.content || "";
const clean = text.replace(/```json|```/g, "").trim();
setResources(JSON.parse(clean));
      } catch (e) {
        setError("Couldn't load AI suggestions. Check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [skill]);

  const typeColors = { Book:"#F9A8D4", YouTube:"#FCA5A5", Website:"#60A5FA", Practice:"#6EE7B7" };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, backdropFilter:"blur(6px)", padding:16, animation:"fadeIn 0.2s ease" }}>
      <div style={{ background:"#111D16", border:"1px solid #1E3326", borderRadius:24, padding:28, width:"100%", maxWidth:420, maxHeight:"88vh", overflowY:"auto", animation:"slideUp 0.3s ease" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <p style={{ fontSize:11, color:"#5A7A64", fontWeight:600, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>AI Learning Guide</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, color:"#F0EBD8" }}>{skill.icon} {skill.name}</h2>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#5A7A64", fontSize:24, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>

        {loading && (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontSize:36, marginBottom:12, animation:"float 1.5s ease-in-out infinite" }}>🤖</div>
            <p style={{ color:"#5A7A64", fontSize:14 }}>Analyzing your progress...</p>
          </div>
        )}

        {error && <p style={{ color:"#EF4444", fontSize:14, textAlign:"center", padding:"20px 0" }}>{error}</p>}

        {resources && (
          <div>
            <div style={{ background:"#1A2E20", borderRadius:14, padding:16, marginBottom:16 }}>
              <p style={{ fontSize:12, color:"#6EE7B7", fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:0.8 }}>💡 Personal Tip</p>
              <p style={{ fontSize:14, color:"#C8D8C4", lineHeight:1.6 }}>{resources.tip}</p>
            </div>

            <p style={{ fontSize:12, color:"#5A7A64", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📚 Recommended Resources</p>
            {resources.resources?.map((r, i) => (
              <div key={i} style={{ background:"#0D1A12", border:"1px solid #1E3326", borderRadius:12, padding:"12px 14px", marginBottom:8, display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ background: (typeColors[r.type] || "#6EE7B7") + "22", color: typeColors[r.type] || "#6EE7B7", fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:20, whiteSpace:"nowrap", marginTop:1 }}>{r.type}</span>
                <div>
                  <p style={{ fontSize:14, fontWeight:600, color:"#F0EBD8", marginBottom:3 }}>{r.title}</p>
                  <p style={{ fontSize:12, color:"#5A7A64", lineHeight:1.5 }}>{r.why}</p>
                </div>
              </div>
            ))}

            <div style={{ background:"linear-gradient(135deg,#1A2E2044,#0D1A12)", border:"1px solid #2D4A35", borderRadius:14, padding:16, marginTop:16 }}>
              <p style={{ fontSize:12, color:"#E8A87C", fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:0.8 }}>🎯 Your Next Goal</p>
              <p style={{ fontSize:14, color:"#C8D8C4", lineHeight:1.6 }}>{resources.nextGoal}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Log Session Modal ──────────────────────────────────────────────────────
function LogModal({ skill, onLog, onClose }) {
  const [hours, setHours] = useState("0");
  const [mins, setMins] = useState("30");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(getToday());

  const handleLog = () => {
    const total = parseInt(hours||0)*60 + parseInt(mins||0);
    if (total <= 0) return;
    onLog({ duration: total, note: note.trim(), date });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, color:"#F0EBD8", marginBottom:4 }}>Log Session</h2>
        <p style={{ color:"#5A7A64", fontSize:13, marginBottom:20 }}>{skill.icon} {skill.name}</p>

        <p className="label">Duration</p>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          <div style={{ flex:1 }}>
            <input type="number" min="0" max="23" value={hours} onChange={e => setHours(e.target.value)} placeholder="0" />
            <p style={{ fontSize:11, color:"#5A7A64", textAlign:"center", marginTop:4 }}>hours</p>
          </div>
          <div style={{ flex:1 }}>
            <input type="number" min="0" max="59" value={mins} onChange={e => setMins(e.target.value)} placeholder="30" />
            <p style={{ fontSize:11, color:"#5A7A64", textAlign:"center", marginTop:4 }}>minutes</p>
          </div>
        </div>

        <p className="label">Date</p>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ marginBottom:14 }} />

        <p className="label">Notes <span style={{ color:"#2D4A35" }}>(optional)</span></p>
        <input placeholder="What did you practice?" value={note} onChange={e => setNote(e.target.value)} style={{ marginBottom:20 }} />

        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex:1 }}>Cancel</button>
          <button className="btn-primary" onClick={handleLog} style={{ flex:2 }}>Log Session ✓</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Skill Modal ────────────────────────────────────────────────────────
function AddSkillModal({ onAdd, onClose, existing }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [category, setCategory] = useState("Tech");
  const [goal, setGoal] = useState("100");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), icon, category, goalHours: parseInt(goal)||100, id: Date.now().toString(), createdAt: getToday() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, color:"#F0EBD8", marginBottom:20 }}>New Skill</h2>

        <p className="label">Skill Name</p>
        <input placeholder="e.g. Guitar, Python, Spanish..." value={name} onChange={e => setName(e.target.value)} style={{ marginBottom:14 }} autoFocus />

        <p className="label">Pick an Icon</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
          {SKILL_ICONS.map(em => (
            <button key={em} onClick={() => setIcon(em)}
              style={{ width:38, height:38, borderRadius:10, border:`2px solid ${icon===em?"#6EE7B7":"transparent"}`, background:icon===em?"#1A3A2A":"#1A2E20", cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
              {em}
            </button>
          ))}
        </div>

        <p className="label">Category</p>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginBottom:14 }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <p className="label">Hour Goal</p>
        <input type="number" min="1" value={goal} onChange={e => setGoal(e.target.value)} placeholder="100" style={{ marginBottom:20 }} />

        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex:1 }}>Cancel</button>
          <button className="btn-primary" onClick={handleAdd} style={{ flex:2 }}>Add Skill</button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function SkillTracker() {
  const [userName, setUserName] = useState(() => localStorage.getItem("skill_user_name") || "");
  const [skills, setSkills] = useState(() => { try { return JSON.parse(localStorage.getItem("skills_v1")) || []; } catch { return []; } });
  const [sessions, setSessions] = useState(() => { try { return JSON.parse(localStorage.getItem("skill_sessions_v1")) || {}; } catch { return {}; } });
  const [tab, setTab] = useState("skills");
  const [showAdd, setShowAdd] = useState(false);
  const [logTarget, setLogTarget] = useState(null);
  const [aiTarget, setAiTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => { localStorage.setItem("skills_v1", JSON.stringify(skills)); }, [skills]);
  useEffect(() => { localStorage.setItem("skill_sessions_v1", JSON.stringify(sessions)); }, [sessions]);

  if (!userName) return <WelcomeScreen onSave={n => setUserName(n)} />;

  const showToast = (message, type = "success") => setToast({ message, type });

  const getSkillSessions = useCallback((skillId) => sessions[skillId] || [], [sessions]);
  const getSkillMins = useCallback((skillId) => getSkillSessions(skillId).reduce((s, x) => s + x.duration, 0), [getSkillSessions]);

  const enrichedSkills = skills.map(s => ({
    ...s,
    totalMins: getSkillMins(s.id),
    sessions: getSkillSessions(s.id),
  }));

  const totalHoursAll = enrichedSkills.reduce((s, sk) => s + sk.totalMins, 0);

  const logSession = (skillId, sessionData) => {
    setSessions(prev => ({
      ...prev,
      [skillId]: [...(prev[skillId] || []), { ...sessionData, id: Date.now().toString() }]
    }));
    const skill = skills.find(s => s.id === skillId);
    const newTotal = getSkillMins(skillId) + sessionData.duration;
    const prevMs = getMilestone(getSkillMins(skillId) / 60);
    const newMs = getMilestone(newTotal / 60);
    if (newMs && newMs !== prevMs) {
      showToast(`${newMs.badge} Milestone unlocked: ${newMs.label}!`, "success");
    } else {
      showToast(`+${fmtHours(sessionData.duration)} logged for ${skill?.name}`, "success");
    }
  };

  const deleteSkill = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    setSessions(prev => { const n = {...prev}; delete n[id]; return n; });
    if (selectedSkill?.id === id) setSelectedSkill(null);
    showToast("Skill removed", "success");
  };

  const exportCSV = () => {
    if (skills.length === 0) { showToast("No skills to export", "error"); return; }
    const rows = [["Skill","Category","Total Hours","Sessions","Goal Hours","Goal %","Milestone"]];
    enrichedSkills.forEach(s => {
      const h = (s.totalMins/60).toFixed(1);
      const ms = getMilestone(s.totalMins/60);
      rows.push([s.name, s.category, h, s.sessions.length, s.goalHours, `${Math.min(100,Math.round((s.totalMins/60/s.goalHours)*100))}%`, ms ? ms.label : "Not started"]);
    });
    rows.push([]);
    rows.push(["--- SESSION LOG ---"]);
    rows.push(["Skill","Date","Duration (mins)","Notes"]);
    enrichedSkills.forEach(s => {
      s.sessions.forEach(ss => rows.push([s.name, ss.date, ss.duration, ss.note || ""]));
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `skills-${getToday()}.csv`; a.click();
    showToast("📥 CSV exported!", "success");
  };

  const detailSkill = selectedSkill ? enrichedSkills.find(s => s.id === selectedSkill.id) : null;

  return (
    <div style={{ minHeight:"100vh", background:"#0D1A12", color:"#C8D8C4", fontFamily:"'Plus Jakarta Sans', sans-serif", position:"relative", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#0D1A12; } ::-webkit-scrollbar-thumb { background:#1E3326; border-radius:4px; }
        @keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px) translateX(-50%)} to{opacity:1;transform:translateY(0) translateX(-50%)} }
        .skill-card { animation:slideUp 0.4s ease both; transition:all 0.25s; border:1px solid #1E3326; background:#111D16; border-radius:18px; padding:18px; cursor:pointer; }
        .skill-card:hover { border-color:#2D4A35; transform:translateY(-2px); }
        .tab-btn { background:none; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:600; padding:8px 16px; border-radius:30px; transition:all 0.2s; }
        .tab-btn.active { background:#6EE7B7; color:#0D1A12; }
        .tab-btn.inactive { color:#5A7A64; }
        .tab-btn.inactive:hover { color:#C8D8C4; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:200; animation:fadeIn 0.2s; backdrop-filter:blur(6px); padding:16px; }
        .modal { background:#111D16; border:1px solid #2D4A35; border-radius:22px; padding:26px; width:100%; max-width:380px; animation:slideUp 0.3s ease; max-height:90vh; overflow-y:auto; }
        input, select { background:#1A2E20; border:1px solid #2D4A35; border-radius:10px; color:#F0EBD8; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; padding:11px 14px; width:100%; outline:none; transition:border 0.2s; }
        input:focus, select:focus { border-color:#6EE7B7; }
        input[type="date"] { color-scheme:dark; }
        .label { font-size:12px; color:#5A7A64; font-weight:600; margin-bottom:7px; }
        .btn-primary { background:linear-gradient(135deg,#6EE7B7,#059669); color:#0D1A12; border:none; border-radius:10px; padding:12px 20px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:opacity 0.2s; }
        .btn-primary:hover { opacity:0.88; }
        .btn-secondary { background:#1A2E20; color:#5A7A64; border:none; border-radius:10px; padding:12px 20px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:opacity 0.2s; }
        .btn-secondary:hover { opacity:0.8; }
        .add-fab { position:fixed; bottom:28px; right:28px; width:58px; height:58px; border-radius:50%; background:linear-gradient(135deg,#6EE7B7,#059669); border:none; cursor:pointer; font-size:28px; color:#0D1A12; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 28px rgba(110,231,183,0.4); transition:all 0.2s; z-index:100; }
        .add-fab:hover { transform:scale(1.1); }
        .prog-bar { height:7px; border-radius:4px; background:#1E3326; overflow:hidden; }
        .prog-fill { height:100%; border-radius:4px; transition:width 1s ease; }
        .glow { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
        .icon-btn { background:none; border:none; cursor:pointer; color:#5A7A64; font-size:15px; padding:4px 6px; transition:color 0.2s; border-radius:6px; }
        .icon-btn:hover { color:#C8D8C4; background:#1A2E20; }
        .sess-item { background:#0D1A12; border:1px solid #1E3326; border-radius:10px; padding:10px 14px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; }
      `}</style>

      <div className="glow" style={{ width:300, height:300, background:"#6EE7B7", top:-100, right:-100, opacity:0.07 }} />
      <div className="glow" style={{ width:200, height:200, background:"#E8A87C", bottom:80, left:-80, opacity:0.07 }} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {logTarget && <LogModal skill={logTarget} onLog={(d) => logSession(logTarget.id, d)} onClose={() => setLogTarget(null)} />}
      {showAdd && <AddSkillModal onAdd={(s) => { setSkills(prev => [...prev, s]); showToast("Skill added! Start logging 🚀"); }} onClose={() => setShowAdd(false)} existing={skills} />}
      {aiTarget && <AIResources skill={aiTarget} onClose={() => setAiTarget(null)} />}

      <div style={{ maxWidth:620, margin:"0 auto", padding:"0 16px 100px" }}>

        {/* Header */}
        <div style={{ padding:"28px 0 18px", animation:"slideUp 0.5s ease", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ color:"#5A7A64", fontSize:13, marginBottom:4 }}>
              {new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" })}
            </p>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:800, color:"#F0EBD8", letterSpacing:"-0.3px" }}>
              Hey, {userName} 👋
            </h1>
            <p style={{ color:"#5A7A64", fontSize:12, marginTop:4 }}>
              {enrichedSkills.length === 0 ? "Add your first skill to begin" : `${enrichedSkills.length} skill${enrichedSkills.length !== 1 ? "s" : ""} · ${fmtHours(totalHoursAll)} total`}
            </p>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            <button className="icon-btn" style={{ fontSize:20 }} title="Export CSV" onClick={exportCSV}>📥</button>
          </div>
        </div>

        {/* Summary cards */}
        {enrichedSkills.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20, animation:"slideUp 0.5s 0.1s ease both" }}>
            {[
              { label:"Total Hours", value: fmtHours(totalHoursAll), icon:"⏱️", color:"#6EE7B7" },
              { label:"Skills", value: enrichedSkills.length, icon:"🎯", color:"#E8A87C" },
              { label:"Sessions", value: Object.values(sessions).flat().length, icon:"📝", color:"#C4B5FD" },
            ].map(s => (
              <div key={s.label} style={{ background:"#111D16", border:"1px solid #1E3326", borderRadius:16, padding:"14px 12px", textAlign:"center" }}>
                <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:800, color:s.color }}>{s.value}</p>
                <p style={{ fontSize:11, color:"#5A7A64", marginTop:2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, background:"#111D16", border:"1px solid #1E3326", borderRadius:40, padding:4, marginBottom:20, animation:"slideUp 0.5s 0.15s ease both" }}>
          {["skills","detail","log"].map(t => (
            <button key={t} className={`tab-btn ${tab===t?"active":"inactive"}`} style={{ flex:1 }} onClick={() => setTab(t)}>
              {t === "skills" ? "My Skills" : t === "detail" ? "Details" : "History"}
            </button>
          ))}
        </div>

        {/* SKILLS TAB */}
        {tab === "skills" && (
          <div>
            {enrichedSkills.length === 0 && (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#5A7A64" }}>
                <div style={{ fontSize:52, marginBottom:12, animation:"float 3s ease-in-out infinite" }}>🌱</div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:18, color:"#3D5C47", marginBottom:6 }}>No skills yet</p>
                <p style={{ fontSize:13 }}>Tap + to add your first skill</p>
              </div>
            )}
            {enrichedSkills.map((s, i) => {
              const ms = getMilestone(s.totalMins / 60);
              const nextMs = getNextMilestone(s.totalMins / 60);
              const goalPct = Math.min(100, Math.round((s.totalMins / 60 / s.goalHours) * 100));
              const catColor = CAT_COLORS[s.category] || "#6EE7B7";
              const todaySessions = s.sessions.filter(ss => ss.date === getToday());
              const todayMins = todaySessions.reduce((sum, ss) => sum + ss.duration, 0);
              return (
                <div key={s.id} className="skill-card" style={{ marginBottom:12, animationDelay:`${i*0.07}s` }}
                  onClick={() => { setSelectedSkill(s); setTab("detail"); }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                    <div style={{ width:46, height:46, borderRadius:14, background: catColor+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                      {s.icon}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                        <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:17, color:"#F0EBD8", fontWeight:700 }}>{s.name}</h3>
                        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                          {ms && <span title={ms.label} style={{ fontSize:18 }}>{ms.badge}</span>}
                          <span style={{ fontSize:11, background:catColor+"22", color:catColor, padding:"2px 8px", borderRadius:20, fontWeight:600 }}>{s.category}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:14, marginBottom:10, flexWrap:"wrap" }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#6EE7B7" }}>{fmtHours(s.totalMins)}</span>
                        <span style={{ fontSize:12, color:"#5A7A64" }}>{s.sessions.length} sessions</span>
                        {todayMins > 0 && <span style={{ fontSize:12, color:"#E8A87C" }}>+{fmtHours(todayMins)} today</span>}
                      </div>
                      <div className="prog-bar">
                        <div className="prog-fill" style={{ width:`${goalPct}%`, background:`linear-gradient(90deg, ${catColor}88, ${catColor})` }} />
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                        <span style={{ fontSize:11, color:"#5A7A64" }}>
                          {nextMs ? `${fmtHours(Math.max(0, nextMs.hours*60 - s.totalMins))} to ${nextMs.badge} ${nextMs.label}` : "🏆 Mastered!"}
                        </span>
                        <span style={{ fontSize:11, color:catColor, fontWeight:600 }}>{goalPct}% of {s.goalHours}h goal</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop:12 }}>
                    <ActivityChart sessions={s.sessions} color={catColor} />
                  </div>

                  <div style={{ display:"flex", gap:8, marginTop:12 }} onClick={e => e.stopPropagation()}>
                    <button className="btn-primary" style={{ flex:2, fontSize:13, padding:"9px 12px" }}
                      onClick={() => setLogTarget(s)}>+ Log Session</button>
                    <button onClick={() => setAiTarget(s)}
                      style={{ flex:1, background:"#1A2E20", border:"1px solid #2D4A35", color:"#6EE7B7", borderRadius:10, padding:"9px 12px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}>
                      🤖 AI Tips
                    </button>
                    <button className="icon-btn" onClick={() => deleteSkill(s.id)} title="Delete">🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DETAIL TAB */}
        {tab === "detail" && (
          <div style={{ animation:"slideUp 0.4s ease" }}>
            {!detailSkill ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#5A7A64" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>👆</div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:16, color:"#3D5C47" }}>Select a skill from My Skills tab</p>
              </div>
            ) : (
              <>
                <div style={{ background:"#111D16", border:"1px solid #1E3326", borderRadius:18, padding:20, marginBottom:14 }}>
                  <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:16 }}>
                    <div style={{ width:52, height:52, borderRadius:16, background:CAT_COLORS[detailSkill.category]+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>
                      {detailSkill.icon}
                    </div>
                    <div>
                      <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, color:"#F0EBD8" }}>{detailSkill.name}</h2>
                      <p style={{ fontSize:12, color:"#5A7A64" }}>{detailSkill.category} · Started {detailSkill.createdAt}</p>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
                    {[
                      [fmtHours(detailSkill.totalMins), "Total Time", "#6EE7B7"],
                      [detailSkill.sessions.length, "Sessions", "#E8A87C"],
                      [`${Math.min(100,Math.round((detailSkill.totalMins/60/detailSkill.goalHours)*100))}%`, "Goal", "#C4B5FD"],
                    ].map(([v,l,c]) => (
                      <div key={l} style={{ background:"#0D1A12", borderRadius:12, padding:"12px 8px", textAlign:"center" }}>
                        <p style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:800, color:c }}>{v}</p>
                        <p style={{ fontSize:11, color:"#5A7A64" }}>{l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Milestones */}
                  <p style={{ fontSize:12, color:"#5A7A64", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Milestones</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {MILESTONES.map(ms => {
                      const unlocked = detailSkill.totalMins / 60 >= ms.hours;
                      return (
                        <div key={ms.hours} style={{ background: unlocked ? ms.color+"22" : "#1A2E20", border:`1px solid ${unlocked ? ms.color+"44" : "#1E3326"}`, borderRadius:10, padding:"6px 12px", display:"flex", gap:6, alignItems:"center", opacity: unlocked ? 1 : 0.4 }}>
                          <span>{ms.badge}</span>
                          <div>
                            <p style={{ fontSize:12, fontWeight:600, color: unlocked ? "#F0EBD8" : "#5A7A64" }}>{ms.label}</p>
                            <p style={{ fontSize:10, color:"#5A7A64" }}>{ms.hours}h</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ background:"#111D16", border:"1px solid #1E3326", borderRadius:18, padding:20, marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:16, color:"#F0EBD8" }}>Activity (14 days)</p>
                  </div>
                  <ActivityChart sessions={detailSkill.sessions} color={CAT_COLORS[detailSkill.category]} />
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                    <span style={{ fontSize:11, color:"#5A7A64" }}>14 days ago</span>
                    <span style={{ fontSize:11, color:"#5A7A64" }}>Today</span>
                  </div>
                </div>

                <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                  <button className="btn-primary" style={{ flex:2 }} onClick={() => setLogTarget(detailSkill)}>+ Log Session</button>
                  <button onClick={() => setAiTarget(detailSkill)}
                    style={{ flex:1, background:"#1A2E20", border:"1px solid #2D4A35", color:"#6EE7B7", borderRadius:10, padding:"12px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                    🤖 AI Tips
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "log" && (
          <div style={{ animation:"slideUp 0.4s ease" }}>
            {Object.values(sessions).flat().length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#5A7A64" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:16, color:"#3D5C47" }}>No sessions logged yet</p>
              </div>
            ) : (
              enrichedSkills.filter(s => s.sessions.length > 0).map(s => (
                <div key={s.id} style={{ marginBottom:18 }}>
                  <p style={{ fontFamily:"'Playfair Display', serif", fontSize:16, color:"#F0EBD8", marginBottom:10 }}>
                    {s.icon} {s.name}
                  </p>
                  {[...s.sessions].reverse().slice(0,10).map(ss => (
                    <div key={ss.id} className="sess-item">
                      <div>
                        <p style={{ fontSize:13, fontWeight:600, color:"#C8D8C4" }}>{fmtHours(ss.duration)}</p>
                        {ss.note && <p style={{ fontSize:12, color:"#5A7A64", marginTop:2 }}>{ss.note}</p>}
                      </div>
                      <span style={{ fontSize:12, color:"#5A7A64" }}>{ss.date}</span>
                    </div>
                  ))}
                  {s.sessions.length > 10 && <p style={{ fontSize:12, color:"#5A7A64", textAlign:"center", padding:"6px 0" }}>+{s.sessions.length - 10} more sessions</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <button className="add-fab" onClick={() => setShowAdd(true)}>+</button>
    </div>
  );
}