import { StudentSessionTelemetry, QuestionTimeRecord, BreakEvent } from '../engine/telemetrySchema';
import { PlacementEngine, PlacementResult } from '../engine/placementEngine';
import { PaymentModal } from './PaymentModal';
import confetti from 'canvas-confetti';

export function renderReportDashboard(
  container: HTMLElement,
  session: StudentSessionTelemetry,
  placement: PlacementResult
) {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) { }

  const { totalScore, recommendedTrack, flags, performanceIndicators } = placement;

  // Flags HTML
  let flagsHtml = '';
  if (flags.length > 0) {
    flagsHtml = flags.map(flag => `
      <div class="p-4 rounded-2xl border ${flag.type === 'critical' ? 'bg-red-50 border-red-200 text-red-900' : 'bg-amber-50 border-amber-200 text-amber-900'} flex items-start gap-3 my-3">
        <div class="text-xl">⚠️</div>
        <div>
          <strong class="font-extrabold text-sm">${flag.title}</strong>
          <p class="text-xs mt-1 opacity-90 font-medium">${flag.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Domain progress bars
  const domainBarsHtml = Object.values(session.domain_scores || {}).map(ds => {
    const pct = Math.round((ds.earned_score / ds.max_score) * 100);
    return `
      <div class="mb-4">
        <div class="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
          <span><strong>${ds.domain_name}</strong> (${ds.weight_pct}% Weight)</span>
          <span class="text-indigo-600 font-extrabold">${ds.earned_score} / ${ds.max_score} Pts (${pct}%)</span>
        </div>
        <div class="w-full h-3 rounded-full bg-slate-100 border border-slate-200/80 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 transition-all duration-500" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  // Format progress bars (Schema B dimension)
  let formatBarsHtml = '';
  if (session.format_scores) {
    formatBarsHtml = Object.values(session.format_scores).map(fs => {
      return `
        <div class="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl mb-2.5">
          <div class="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span><strong>${fs.format.toUpperCase()}</strong> (${fs.weight_pct}% Weight • ${fs.question_count} Qs)</span>
            <span class="text-indigo-600 font-extrabold">${fs.raw_accuracy_pct}% Accuracy (+${fs.earned_contribution} pts)</span>
          </div>
          <div class="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500" style="width: ${fs.raw_accuracy_pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Per-Question Time Analysis Table
  const timeRecords = session.question_time_records || [];
  const timeTableRows = timeRecords.map(r => {
    if (!r) return '';
    const activeSecs = Math.round(r.activeDurationMs / 1000);
    const latencySecs = r.responseLatencyMs ? (r.responseLatencyMs / 1000).toFixed(1) + 's' : '—';
    const remainingSecs = r.remainingTimeWhenAnsweredMs ? Math.round(r.remainingTimeWhenAnsweredMs / 1000) + 's' : '0s';

    let statusBadge = '<span class="text-emerald-600 font-extrabold">🟢 Fast</span>';
    if (r.timedOut) {
      statusBadge = '<span class="text-rose-600 font-extrabold">⏰ Timed Out</span>';
    } else if (activeSecs > 80) {
      statusBadge = '<span class="text-amber-600 font-extrabold">🔴 Slow</span>';
    } else if (activeSecs > 45) {
      statusBadge = '<span class="text-indigo-600 font-extrabold">🟡 Normal</span>';
    }

    const rowBg = r.timedOut ? 'bg-rose-50/60' : 'hover:bg-slate-50';

    return `
      <tr class="${rowBg} border-b border-slate-100 text-xs transition-colors">
        <td class="p-3 font-extrabold text-center text-slate-500">Q${r.questionSlot}</td>
        <td class="p-3 text-center font-bold text-indigo-600">P${r.part || 1}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-extrabold text-[11px]">
            ${r.domain.replace('_', ' ')}
          </span>
        </td>
        <td class="p-3 font-bold text-slate-800">${r.subSkill}</td>
        <td class="p-3 text-center font-bold">${activeSecs}s</td>
        <td class="p-3 text-center text-slate-500">${latencySecs}</td>
        <td class="p-3 text-center text-slate-500">${remainingSecs}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-center font-bold">${r.breaksDuringQuestion > 0 ? `⏸️ ${r.breaksDuringQuestion}` : '0'}</td>
        <td class="p-3 text-center font-extrabold text-indigo-700">${r.earnedScore} / ${r.maxScore}</td>
      </tr>
    `;
  }).join('');

  // Break History Log
  const breakEvents = session.break_events || [];
  let breakLogHtml = '';
  if (breakEvents.length > 0 || session.part_break_record) {
    let partBreakHtml = '';
    if (session.part_break_record) {
      const pDurationMin = Math.round((session.part_break_record.breakDurationMs || 0) / 60000);
      partBreakHtml = `
        <div class="flex justify-between items-center bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl mb-2 text-xs">
          <div>
            <strong class="text-emerald-950 font-black">☕ Part 1 Mandatory 5-Min Break</strong> • Between Part 1 &amp; Part 2
          </div>
          <div class="text-emerald-700 font-extrabold">
            Duration: ${pDurationMin} min ${session.part_break_record.studentInitiatedEarly ? '(Resumed Early)' : '(Full Break)'}
          </div>
        </div>
      `;
    }

    const itemBreaksHtml = breakEvents.map(b => {
      const durMins = Math.floor(b.breakDurationMs / 60000);
      const durSecs = Math.round((b.breakDurationMs % 60000) / 1000);
      const remSecs = Math.round(b.countdownRemainingAtPause);
      return `
        <div class="flex justify-between items-center bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl mb-2 text-xs">
          <div>
            <strong class="text-slate-900 font-black">Pause #${b.breakIndex}</strong> • During <strong class="text-indigo-600">Q${b.questionSlotAtPause}</strong> (${b.domainAtPause.replace('_', ' ')})
          </div>
          <div class="text-amber-700 font-bold">
            Duration: ${durMins > 0 ? `${durMins}m ` : ''}${durSecs}s (Timer left: ${remSecs}s)
          </div>
        </div>
      `;
    }).join('');

    breakLogHtml = partBreakHtml + itemBreaksHtml;
  } else {
    breakLogHtml = `
      <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl font-bold text-xs text-center">
        ✅ Continuous Completion — Student completed all questions without extra sensory pauses.
      </div>
    `;
  }

  // Summary Metrics
  const totalActiveMins = Math.round((session.total_active_duration_ms || 0) / 60000);
  const totalBreakMins = Math.round((session.total_break_duration_ms || 0) / 60000);
  const totalWallMins = Math.round((session.total_wall_clock_duration_ms || 0) / 60000);
  const totalTimedOutCount = timeRecords.filter(r => r?.timedOut).length;

  saveSessionToCEODatabase(session);

  container.innerHTML = `
    <div class="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col md:flex-row font-sans" dir="ltr">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          <div class="flex items-center gap-3 mb-8 px-2 cursor-pointer" onclick="window.returnToLandingPage ? window.returnToLandingPage() : window.location.reload()">
            <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-200">
              📄
            </div>
            <div>
              <span class="font-black text-slate-900 text-lg tracking-tight leading-none block">CodeRa</span>
              <span class="text-[9px] font-black text-indigo-600 uppercase tracking-widest block mt-1">Student Report</span>
            </div>
          </div>

          <nav class="space-y-1.5">
            <button id="ceo-dashboard-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-chart-line text-purple-600 text-sm"></i>
              <span>CEO Dashboard</span>
            </button>
            <button id="download-pdf-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-file-pdf text-rose-500 text-sm"></i>
              <span>Download PDF</span>
            </button>
            <button id="print-report-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-print text-slate-400 text-sm"></i>
              <span>Print Report</span>
            </button>
            <button onclick="window.returnToLandingPage ? window.returnToLandingPage() : window.location.reload()" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-house text-slate-400 text-sm"></i>
              <span>Return to Main Site</span>
            </button>
          </nav>
        </div>

        <div class="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
              S
            </div>
            <div>
              <div class="text-xs font-black text-slate-900">${session.student_name}</div>
              <div class="text-[10px] text-slate-400 font-bold">Age: ${session.age_group || '13-16'}</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 p-5 sm:p-8 space-y-8 overflow-y-auto">
        
        <!-- Top Navbar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Assessment Reports</span>
              <span>/</span>
              <span class="text-indigo-600 font-black">Student Placement Report</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Placement Report: ${session.student_name}</h1>
          </div>

          <div class="flex items-center gap-3">
            <button id="download-pdf-btn-top" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-download"></i> Download PDF
            </button>
          </div>
        </div>

        <!-- Main Report Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-8">
          
          <!-- Summary Banner -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <!-- Score Badge Card -->
            <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 border-2 border-indigo-200/80 rounded-3xl p-6 text-center space-y-3">
              <div class="text-xs font-black text-indigo-500 uppercase tracking-wider">Technology Readiness Score</div>
              <div class="text-5xl font-black text-indigo-700">${totalScore}<span class="text-2xl font-bold text-slate-400">/100</span></div>
              <div class="pt-2 border-t border-indigo-100">
                <div class="text-xs font-bold text-slate-500">Recommended Track</div>
                <div class="text-xl font-black text-emerald-600 mt-0.5">${recommendedTrack}</div>
              </div>
            </div>

            <!-- Performance Indicators -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-chart-simple text-indigo-600"></i> Competency Domain Breakdown
              </h3>
              ${domainBarsHtml}
              ${flagsHtml}
            </div>

          </div>

          <!-- Format Breakdown -->
          ${formatBarsHtml ? `
            <div class="pt-6 border-t border-slate-100">
              <h3 class="text-base font-black text-slate-900 mb-4">Format-Weighted Accuracy</h3>
              ${formatBarsHtml}
            </div>
          ` : ''}

          <!-- Executive Time Analytics -->
          <div class="pt-6 border-t border-slate-100">
            <h3 class="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-clock text-indigo-600"></i> Executive Time &amp; Attention Analytics
            </h3>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <div class="text-[11px] font-bold text-slate-400 uppercase">Active Thinking</div>
                <div class="text-2xl font-black text-indigo-700 mt-1">${totalActiveMins} min</div>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <div class="text-[11px] font-bold text-slate-400 uppercase">Pause / Rest</div>
                <div class="text-2xl font-black text-amber-600 mt-1">${totalBreakMins} min</div>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <div class="text-[11px] font-bold text-slate-400 uppercase">Session Duration</div>
                <div class="text-2xl font-black text-slate-800 mt-1">${totalWallMins} min</div>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <div class="text-[11px] font-bold text-slate-400 uppercase">Focus Ratio</div>
                <div class="text-2xl font-black text-emerald-600 mt-1">${totalWallMins > 0 ? Math.round((totalActiveMins / totalWallMins) * 100) : 100}%</div>
              </div>
            </div>

            <!-- Break Log -->
            <div class="mb-6">
              <h4 class="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">Pause &amp; Rest Log:</h4>
              ${breakLogHtml}
            </div>

            <!-- Question Time Breakdown Table -->
            <div>
              <h4 class="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">Detailed Per-Question Breakdown (50 Items):</h4>
              <div class="overflow-x-auto rounded-2xl border border-slate-200 max-h-96">
                <table class="w-full text-left border-collapse">
                  <thead class="bg-slate-50 sticky top-0 border-b border-slate-200 text-[11px] uppercase font-black text-slate-500">
                    <tr>
                      <th class="p-3 text-center">#</th>
                      <th class="p-3 text-center">Part</th>
                      <th class="p-3">Domain</th>
                      <th class="p-3">Sub-Skill</th>
                      <th class="p-3 text-center">Active Time</th>
                      <th class="p-3 text-center">Reaction</th>
                      <th class="p-3 text-center">Timer Left</th>
                      <th class="p-3 text-center">Status</th>
                      <th class="p-3 text-center">Pauses</th>
                      <th class="p-3 text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${timeTableRows}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  // Attach Event Listeners
  const parentHubBtn = container.querySelector('#parent-hub-btn');
  if (parentHubBtn) {
    parentHubBtn.addEventListener('click', (e) => {
      e.preventDefault();
      import('./ParentDashboard').then(mod => {
        mod.renderParentDashboard(container);
      });
    });
  }

  const ceoBtn = container.querySelector('#ceo-dashboard-btn');
  if (ceoBtn) {
    ceoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCEODashboard(container, session, placement);
    });
  }

  const downloadPdfBtn = container.querySelector('#download-pdf-btn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const downloadPdfBtnTop = container.querySelector('#download-pdf-btn-top');
  if (downloadPdfBtnTop) {
    downloadPdfBtnTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const printBtn = container.querySelector('#print-report-btn');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}

function saveSessionToCEODatabase(session: StudentSessionTelemetry) {
  try {
    const rawSessions = localStorage.getItem('codera_all_sessions') || localStorage.getItem('cognix_all_sessions') || '[]';
    const allSessions: StudentSessionTelemetry[] = JSON.parse(rawSessions);

    const existingIdx = allSessions.findIndex(s => s.session_id === session.session_id);
    if (existingIdx >= 0) {
      allSessions[existingIdx] = session;
    } else {
      allSessions.unshift(session);
    }

    localStorage.setItem('codera_all_sessions', JSON.stringify(allSessions));
  } catch (e) { }
}

export function renderCEODashboard(
  container: HTMLElement,
  activeSession?: StudentSessionTelemetry,
  activePlacement?: PlacementResult
) {
  let sessions: StudentSessionTelemetry[] = [];
  try {
    const rawSessions = localStorage.getItem('codera_all_sessions') || localStorage.getItem('cognix_all_sessions');
    if (rawSessions) {
      sessions = JSON.parse(rawSessions);
    }
  } catch (e) { }

  if (sessions.length === 0 && activeSession) {
    sessions.push(activeSession);
  }

  // Fallback mock session for preview if empty
  if (sessions.length === 0) {
    sessions.push({
      session_id: 'SES-9001',
      student_name: 'Alex Rivers',
      age_group: '7-9',
      total_score: 88,
      placed_track: 'L2 Robotics & Logic',
      schema_version: '2.0',
      start_time: new Date().toISOString(),
      total_active_duration_ms: 1200000,
      total_break_duration_ms: 180000,
      flags: []
    } as any);
  }

  const totalStudents = sessions.length;
  const avgTotalScore = Math.round(sessions.reduce((acc, s) => acc + (s.total_score || 0), 0) / totalStudents);
  const avgActiveMins = (sessions.reduce((acc, s) => acc + ((s.total_active_duration_ms || 0) / 60000), 0) / totalStudents).toFixed(1);

  let studentRowsHtml = sessions.map((s, idx) => {
    const activeMins = Math.round((s.total_active_duration_ms || 0) / 60000);
    const flagsCount = Array.isArray(s.flags) ? s.flags.length : 0;
    const dateStr = s.start_time ? new Date(s.start_time).toLocaleDateString() : 'Today';

    return `
      <tr class="hover:bg-slate-50 border-b border-slate-100 text-xs transition-colors">
        <td class="p-3.5 font-extrabold text-slate-400">#${idx + 1}</td>
        <td class="p-3.5 font-black text-slate-900 text-sm">${s.student_name}</td>
        <td class="p-3.5 text-slate-500 font-bold">${s.age_group || '8-10'}</td>
        <td class="p-3.5 font-black text-indigo-700 text-sm">${s.total_score}/100</td>
        <td class="p-3.5">
          <span class="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-extrabold text-xs inline-block">
            ${s.placed_track || s.recommended_track || 'L1 Coder'}
          </span>
        </td>
        <td class="p-3.5 text-center font-bold text-slate-700">${activeMins}m</td>
        <td class="p-3.5 text-center">
          ${flagsCount > 0
        ? `<span class="bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-xl font-extrabold text-[11px]">⚠️ ${flagsCount} Flags</span>`
        : '<span class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-xl font-extrabold text-[11px]">✅ Clean</span>'
      }
        </td>
        <td class="p-3.5 text-slate-500 font-medium">${dateStr}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col md:flex-row font-sans" dir="ltr">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          <div class="flex items-center gap-3 mb-8 px-2 cursor-pointer" onclick="window.returnToLandingPage ? window.returnToLandingPage() : window.location.reload()">
            <div class="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-purple-200">
              👑
            </div>
            <div>
              <span class="font-black text-slate-900 text-lg tracking-tight leading-none block">CodeRa</span>
              <span class="text-[9px] font-black text-purple-600 uppercase tracking-widest block mt-1">CEO Executive Hub</span>
            </div>
          </div>

          <nav class="space-y-1.5">
            <button id="ceo-parent-hub-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-hands-holding-child text-indigo-600 text-sm"></i>
              <span>Parent Hub</span>
            </button>
            <button id="ceo-export-pdf-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-file-pdf text-rose-500 text-sm"></i>
              <span>Generate PDF Report</span>
            </button>
            <button id="back-to-home-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all text-start cursor-pointer">
              <i class="fa-solid fa-house text-slate-400 text-sm"></i>
              <span>Return to Main Site</span>
            </button>
          </nav>
        </div>

        <div class="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
              CEO
            </div>
            <div>
              <div class="text-xs font-black text-slate-900">Executive Access</div>
              <div class="text-[10px] text-slate-400 font-bold">Encrypted Telemetry</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 p-5 sm:p-8 space-y-8 overflow-y-auto">
        
        <!-- Top Navbar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Executive Command</span>
              <span>/</span>
              <span class="text-purple-600 font-black">Analytics Dashboard</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">CodeRa Executive Dashboard 👑</h1>
          </div>

          <div class="flex items-center gap-3">
            <button id="ceo-export-pdf-btn-top" class="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-download"></i> PDF Report
            </button>
          </div>
        </div>

        <!-- KPI Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-black shrink-0">
              👨‍🎓
            </div>
            <div>
              <div class="text-3xl font-black text-indigo-700 leading-none">${totalStudents}</div>
              <div class="text-xs font-bold text-slate-400 mt-1">Total Students Assessed</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl font-black shrink-0">
              📈
            </div>
            <div>
              <div class="text-3xl font-black text-emerald-600 leading-none">${avgTotalScore}/100</div>
              <div class="text-xs font-bold text-slate-400 mt-1">Avg Readiness Score</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl font-black shrink-0">
              ⏱️
            </div>
            <div>
              <div class="text-3xl font-black text-amber-600 leading-none">${avgActiveMins} <span class="text-base font-bold">min</span></div>
              <div class="text-xs font-bold text-slate-400 mt-1">Avg Thinking Time</div>
            </div>
          </div>

        </div>

        <!-- Student Registry Table -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
          <div class="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 class="text-xl font-black text-slate-900 tracking-tight">Student Assessment Registry</h2>
              <p class="text-xs text-slate-500 font-medium">Real-time placement results and cognitive flags</p>
            </div>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              Showing ${totalStudents} Records
            </span>
          </div>

          <div class="overflow-x-auto rounded-2xl border border-slate-200">
            <table class="w-full text-left border-collapse">
              <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-black text-slate-500">
                <tr>
                  <th class="p-3.5">#</th>
                  <th class="p-3.5">Student Name</th>
                  <th class="p-3.5">Age Group</th>
                  <th class="p-3.5">Total Score</th>
                  <th class="p-3.5">Placed Level</th>
                  <th class="p-3.5 text-center">Active Time</th>
                  <th class="p-3.5 text-center">Flags</th>
                  <th class="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody>
                ${studentRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;

  const ceoParentHubBtn = container.querySelector('#ceo-parent-hub-btn');
  if (ceoParentHubBtn) {
    ceoParentHubBtn.addEventListener('click', (e) => {
      e.preventDefault();
      import('./ParentDashboard').then(mod => {
        mod.renderParentDashboard(container);
      });
    });
  }

  const pdfBtn = container.querySelector('#ceo-export-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const pdfBtnTop = container.querySelector('#ceo-export-pdf-btn-top');
  if (pdfBtnTop) {
    pdfBtnTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const homeBtn = container.querySelector('#back-to-home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      returnToLandingPage();
    });
  }

  const reportBtn = container.querySelector('#back-to-report-btn');
  if (reportBtn && activeSession) {
    reportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const placement = activePlacement || PlacementEngine.evaluatePlacement(
        activeSession.total_score,
        activeSession.domain_scores,
        activeSession.item_telemetries,
        activeSession.schema_version || '2.0'
      );
      renderReportDashboard(container, activeSession, placement);
    });
  }
}

export function returnToLandingPage() {
  const childTestPage = document.getElementById('childTestPage');
  if (childTestPage) {
    childTestPage.classList.add('hidden');
    childTestPage.classList.remove('exam-active');
    childTestPage.style.display = 'none';
  }
  document.body.classList.remove('exam-mode');
  document.body.classList.remove('ceo-view-mode');

  const header = document.querySelector('header');
  if (header) header.classList.remove('hidden');
  const main = document.querySelector('main');
  if (main) main.classList.remove('hidden');
  const footer = document.querySelector('footer');
  if (footer) footer.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

