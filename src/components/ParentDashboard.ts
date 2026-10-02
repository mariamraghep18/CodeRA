import { ParentProfileData, ParentRegistrationModal } from './ParentRegistrationModal';
import { StudentSessionTelemetry } from '../engine/telemetrySchema';
import { PlacementEngine } from '../engine/placementEngine';
import { renderReportDashboard, returnToLandingPage, renderCEODashboard } from './ReportDashboard';
import { AssessmentRunner } from './AssessmentRunner';
import { PaymentModal } from './PaymentModal';

export function renderParentDashboard(
  container: HTMLElement,
  selectedProfile?: ParentProfileData
) {
  // Retrieve registry of children or current profile
  let registry: ParentProfileData[] = [];
  try {
    const rawRegistry = localStorage.getItem('codera_student_registry');
    if (rawRegistry) {
      registry = JSON.parse(rawRegistry);
    }
  } catch (e) {}

  if (registry.length === 0) {
    try {
      const singleProfile = localStorage.getItem('codera_parent_profile');
      if (singleProfile) {
        registry.push(JSON.parse(singleProfile));
      }
    } catch (e) {}
  }

  // Fallback sample child if registry is empty for rich preview
  if (registry.length === 0) {
    registry.push({
      id: 'STU-1001',
      studentFullName: 'Alex Rivers',
      age: 8,
      diagnosis: 'Typical',
      diagnosisNotes: '',
      preferredLanguage: 'en',
      gradeLevel: 'Grade 1-3',
      devices: ['Tablet/iPad', 'Laptop'],
      priorExperience: 'Scratch Jr',
      digitalSkills: ['Mouse/Touch Navigation', 'Following Instructions'],
      passions: ['LEGO', 'Robots'],
      registeredAt: new Date().toISOString()
    });
  }

  // Retrieve stored assessment sessions
  let sessions: StudentSessionTelemetry[] = [];
  try {
    const rawSessions = localStorage.getItem('codera_all_sessions') || localStorage.getItem('cognix_all_sessions');
    if (rawSessions) {
      sessions = JSON.parse(rawSessions);
    }
  } catch (e) {}

  const openNewChildModal = () => {
    const modal = new ParentRegistrationModal((newProfile) => {
      renderParentDashboard(container, newProfile);
    });
    modal.open(1);
  };

  // Calculate high-level stats
  const completedAssessmentsCount = registry.filter(c => 
    sessions.some(s => s.student_name.toLowerCase().trim() === c.studentFullName.toLowerCase().trim())
  ).length;

  const totalScoreSum = sessions.reduce((acc, s) => acc + (s.total_score || 0), 0);
  const avgScore = sessions.length > 0 ? Math.round(totalScoreSum / sessions.length) : null;

  const childrenCardsHtml = registry.map((child, idx) => {
    const matchingSession = sessions.find(s => 
      s.student_name.toLowerCase().trim() === child.studentFullName.toLowerCase().trim()
    ) || (idx === 0 && sessions.length > 0 ? sessions[0] : null);

    const hasCompletedAssessment = !!matchingSession;
    const totalScore = matchingSession ? matchingSession.total_score : null;
    const placedTrack = matchingSession ? (matchingSession.placed_track || matchingSession.recommended_track || 'L1 Foundational Coder') : 'Pending Placement';

    const passionsHtml = (child.passions || []).map(p => `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6264F2] border border-[#C7D2FE] text-xs font-bold shadow-sm break-words max-w-full">
        ✨ ${p}
      </span>
    `).join('');

    const devicesHtml = (child.devices || []).map(d => `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F6F3EE] text-[#17233D] text-xs font-semibold border border-[#E4DDD3] break-words max-w-full">
        💻 ${d}
      </span>
    `).join('');

    return `
      <div class="bg-white rounded-[28px] p-5 sm:p-7 border border-[#E4DDD3] shadow-[0_14px_35px_rgba(31,41,55,0.08)] hover:shadow-[0_25px_55px_rgba(99,102,241,0.2)] hover:border-[#6264F2] transition-all duration-500 relative flex flex-col justify-between group min-h-[480px] h-full w-full min-w-0 break-words">
        
        <!-- Profile Top Bar -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#F0EAE1]">
            <div class="flex items-center gap-3.5 min-w-0 flex-1">
              <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#6264F2] to-purple-700 text-white flex items-center justify-center text-xl sm:text-2xl font-black shadow-md group-hover:scale-105 transition-transform shrink-0">
                ${child.studentFullName.charAt(0).toUpperCase()}
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg md:text-xl font-serif font-extrabold text-[#17233D] tracking-tight leading-snug break-words" title="${child.studentFullName}">
                  ${child.studentFullName}
                </h3>
                <div class="text-xs text-[#687286] font-medium mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span class="inline-flex items-center gap-1">Age: <strong class="text-[#17233D] font-bold">${child.age} yrs</strong></span>
                  <span class="text-slate-300">•</span>
                  <span class="inline-flex items-center gap-1">Grade: <strong class="text-[#17233D] font-bold">${child.gradeLevel || 'Grade 1-3'}</strong></span>
                </div>
              </div>
            </div>
            
            ${hasCompletedAssessment ? `
              <div class="shrink-0 self-start sm:self-center bg-[#EEF2FF] border border-[#C7D2FE] px-3.5 py-2 rounded-2xl">
                <div class="text-xl sm:text-2xl font-bold text-[#6264F2] leading-none">${totalScore}/100</div>
                <div class="text-[9px] uppercase font-black tracking-wider text-[#6264F2] mt-0.5">Readiness Score</div>
              </div>
            ` : `
              <span class="shrink-0 self-start sm:self-center px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-hourglass-half text-amber-600 animate-spin" style="animation-duration: 3s;"></i> ⏳ Pending Test
              </span>
            `}
          </div>

          ${hasCompletedAssessment ? `
            <div class="px-4 py-2.5 rounded-2xl bg-[#F6FEFD] border border-[#99F6E4] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span class="text-[#5D6B82] font-medium shrink-0">Placed Track:</span>
              <span class="font-bold text-[#159E99] flex items-center gap-1.5 text-xs sm:text-sm break-words min-w-0">
                <i class="fa-solid fa-award text-amber-500 shrink-0"></i> <span class="break-words">${placedTrack}</span>
              </span>
            </div>
          ` : ''}

          <!-- Info Badges & Details -->
          <div class="space-y-3.5 my-4">
            <div class="p-4 rounded-2xl bg-[#F6F3EE] border border-[#E4DDD3] text-xs space-y-2.5">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <span class="text-[#687286] font-medium">Diagnosis / Profile:</span>
                <span class="font-bold text-[#17233D] px-2.5 py-0.5 rounded-lg bg-white border border-[#E4DDD3] shadow-sm break-words max-w-full">${child.diagnosis || 'Typical'}</span>
              </div>
              <div class="flex flex-wrap justify-between items-center gap-2">
                <span class="text-[#687286] font-medium">Tech Experience:</span>
                <span class="font-bold text-[#6264F2] break-words">${child.priorExperience || 'Beginner'}</span>
              </div>
              <div class="flex flex-wrap justify-between items-center gap-2">
                <span class="text-[#687286] font-medium">Preferred Language:</span>
                <span class="font-bold text-[#17233D]">${child.preferredLanguage === 'ar' ? 'Arabic 🇪🇬' : 'English 🇬🇧'}</span>
              </div>
            </div>

            <!-- Passions Pills -->
            <div>
              <div class="text-[11px] font-bold text-[#7A8494] uppercase tracking-wider mb-2">Selected Passions &amp; Badges:</div>
              <div class="flex flex-wrap gap-1.5">
                ${passionsHtml || '<span class="text-xs text-slate-400">No passions specified</span>'}
              </div>
            </div>

            <!-- Devices Equipped -->
            <div>
              <div class="text-[11px] font-bold text-[#7A8494] uppercase tracking-wider mb-2">Equipped Devices:</div>
              <div class="flex flex-wrap gap-1.5">
                ${devicesHtml}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-5 border-t border-[#F0EAE1] flex flex-col gap-2.5 mt-4">
          ${hasCompletedAssessment ? `
            <button data-child-report="${child.studentFullName}" class="view-child-report-btn w-full py-3.5 px-4 bg-[#6264F2] hover:bg-[#5254E2] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer transform hover:-translate-y-0.5">
              <i class="fa-solid fa-file-invoice text-base shrink-0"></i>
              <span class="break-words text-center">View Comprehensive Report</span>
              <i class="fa-solid fa-arrow-right ml-auto shrink-0"></i>
            </button>

            <button data-child-track="${placedTrack}" class="book-now-payment-btn w-full py-3.5 px-4 bg-[#159E99] hover:bg-[#128B87] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer transform hover:-translate-y-0.5">
              <i class="fa-solid fa-credit-card text-base shrink-0"></i>
              <span class="break-words text-center">Book Now &amp; Enroll Student 💳</span>
            </button>
            
            <button data-child-retake="${child.studentFullName}" class="retake-child-test-btn w-full py-2.5 px-4 bg-[#F6F3EE] hover:bg-[#ECE6DC] text-[#17233D] font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer border border-[#E4DDD3]">
              <i class="fa-solid fa-rotate-right text-[#6264F2] shrink-0"></i>
              <span class="break-words text-center">Retake 50-Question Assessment</span>
            </button>
          ` : `
            <button data-child-start="${child.studentFullName}" class="start-child-test-btn w-full py-4 px-4 bg-[#159E99] hover:bg-[#128B87] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer transform hover:-translate-y-0.5">
              <i class="fa-solid fa-rocket text-base shrink-0"></i>
              <span class="break-words text-center">Start 50-Question AI Assessment Now 🚀</span>
            </button>
          `}
        </div>

      </div>
    `;
  }).join('');

  // Add New Child Card
  const addNewChildCardHtml = `
    <div id="addNewChildBtnCard" class="bg-white border-2 border-dashed border-[#C7D2FE] hover:border-[#6264F2] rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-500 hover:scale-[1.01] shadow-[0_12px_30px_rgba(31,41,55,0.06)] hover:shadow-[0_22px_45px_rgba(99,102,241,0.18)] group min-h-[480px] h-full w-full min-w-0 break-words">
      <div class="flex flex-col items-center my-auto py-6">
        <div class="w-20 h-20 rounded-full bg-[#EEF2FF] text-[#6264F2] group-hover:bg-[#6264F2] group-hover:text-white flex items-center justify-center text-3xl font-black transition-all mb-5 shadow-md group-hover:rotate-6 shrink-0">
          <i class="fa-solid fa-user-plus"></i>
        </div>
        <h3 class="text-xl font-serif font-bold text-[#17233D] mb-2 break-words">Register Another Student</h3>
        <p class="text-xs text-[#687286] max-w-xs mb-6 font-medium leading-relaxed break-words">
          Add another child profile to customize their learning interest survey, accessibility accommodations, and launch independent AI assessments.
        </p>
      </div>
      <span class="w-full py-3.5 px-6 rounded-2xl bg-[#6264F2] hover:bg-[#5254E2] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
        <i class="fa-solid fa-plus shrink-0"></i>
        <span class="break-words">Add Student Profile</span>
      </span>
    </div>
  `;

  container.innerHTML = `
    <div class="min-h-screen bg-[#F6F3EE] text-[#17233D] flex flex-col font-sans" dir="ltr">
      
      <!-- MAIN DASHBOARD CONTENT AREA (FULL WIDTH STANDALONE PAGE) -->
      <div class="flex-1 max-w-7xl mx-auto w-full p-5 sm:p-8 space-y-8 overflow-y-auto">
        
        <!-- Top Navbar with Back / Return Button -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DDD3]">
          <div class="flex items-center gap-4 min-w-0">
            <button onclick="window.returnToLandingPage ? window.returnToLandingPage() : window.location.reload()" class="w-10 h-10 rounded-2xl bg-white border border-[#E4DDD3] text-[#17233D] hover:bg-indigo-50 hover:text-[#6264F2] hover:border-[#C7D2FE] flex items-center justify-center transition-all cursor-pointer shadow-sm group shrink-0" title="Return to Role Selection">
              <i class="fa-solid fa-arrow-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
            </button>
            <div class="min-w-0">
              <div class="flex items-center gap-2 text-xs font-bold text-[#7A8494] uppercase tracking-wider mb-1 flex-wrap">
                <span>CodeRa</span>
                <span>/</span>
                <span>Parent Portal</span>
                <span>/</span>
                <span class="text-[#6264F2] font-bold">Overview</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#17233D] tracking-tight truncate">Parent Dashboard</h1>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <button id="topAddNewChildBtnHeader" class="px-4 py-2.5 bg-[#6264F2] hover:bg-[#5254E2] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]">
              <i class="fa-solid fa-plus shrink-0"></i> <span class="break-words">Add Student</span>
            </button>
            <button type="button" onclick="if (typeof window.openCEODashboard === 'function') window.openCEODashboard();" class="px-4 py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 font-extrabold text-xs shadow-sm hover:bg-purple-100 transition-all flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-chart-line text-purple-600 shrink-0"></i> <span class="break-words">CEO Dashboard</span>
            </button>
            <button onclick="window.returnToLandingPage ? window.returnToLandingPage() : window.location.reload()" class="px-4 py-2.5 rounded-2xl bg-white border border-[#E4DDD3] text-[#17233D] font-bold text-xs shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-house text-[#6264F2] shrink-0"></i> <span class="break-words">Return to Main Page</span>
            </button>
          </div>
        </div>

        <!-- Welcome Hero Banner (CodeRa Style) -->
        <div class="bg-white rounded-[28px] p-6 sm:p-8 text-[#17233D] border border-[#E4DDD3] shadow-[0_14px_35px_rgba(31,41,55,0.08)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-w-0 break-words">
          <div class="relative z-10 space-y-3 min-w-0 flex-1">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#6264F2] text-xs font-bold uppercase tracking-wider border border-[#C7D2FE] flex-wrap max-w-full">
              <span>👨‍👩‍👧‍👦 CodeRa Parent Hub</span>
              <span>&bull;</span>
              <span class="text-[#159E99]">Family &amp; Student Portal</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#17233D] break-words">
              Welcome to your Parent Hub 👋
            </h2>
            <p class="text-[#5D6B82] text-sm max-w-2xl font-medium leading-relaxed break-words">
              Track your child's digital progress, review AI placement evaluation matrixes, or register additional children into CodeRa's inclusive tech ecosystem.
            </p>
          </div>
          <div class="relative z-10 shrink-0">
            <button id="topAddNewChildBtn" class="px-6 py-3.5 bg-[#6264F2] text-white hover:bg-[#5254E2] font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105">
              <i class="fa-solid fa-user-plus shrink-0"></i> <span class="break-words">Register Student</span>
            </button>
          </div>
        </div>

        <!-- KPI Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          <div class="bg-white p-5 rounded-[24px] border border-[#E4DDD3] shadow-[0_12px_30px_rgba(31,41,55,0.06)] flex items-center gap-4 min-w-0 break-words">
            <div class="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#6264F2] flex items-center justify-center text-2xl font-black shrink-0">
              👶
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-2xl font-serif font-bold text-[#17233D] truncate">${registry.length}</div>
              <div class="text-xs font-medium text-[#7A8494] break-words">Registered Students</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-[24px] border border-[#E4DDD3] shadow-[0_12px_30px_rgba(31,41,55,0.06)] flex items-center gap-4 min-w-0 break-words">
            <div class="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#159E99] flex items-center justify-center text-2xl font-black shrink-0">
              ✅
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-2xl font-serif font-bold text-[#17233D] truncate">${completedAssessmentsCount}</div>
              <div class="text-xs font-medium text-[#7A8494] break-words">Completed Assessments</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-[24px] border border-[#E4DDD3] shadow-[0_12px_30px_rgba(31,41,55,0.06)] flex items-center gap-4 min-w-0 break-words">
            <div class="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#6264F2] flex items-center justify-center text-2xl font-black shrink-0">
              ⭐
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-2xl font-serif font-bold text-[#17233D] truncate">${avgScore !== null ? `${avgScore}/100` : 'N/A'}</div>
              <div class="text-xs font-medium text-[#7A8494] break-words">Avg Placement Score</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-[24px] border border-[#E4DDD3] shadow-[0_12px_30px_rgba(31,41,55,0.06)] flex items-center gap-4 min-w-0 break-words">
            <div class="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#159E99] flex items-center justify-center text-2xl font-black shrink-0">
              🛡️
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-2xl font-serif font-bold text-[#17233D] truncate">Active</div>
              <div class="text-xs font-medium text-[#7A8494] break-words">Inclusive Accommodations</div>
            </div>
          </div>
        </div>

        <!-- Student Profiles Section -->
        <div id="children-grid-section">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 class="text-2xl font-serif font-bold text-[#17233D] tracking-tight flex items-center gap-2.5 break-words">
                <i class="fa-solid fa-children text-[#6264F2] shrink-0"></i>
                <span class="break-words">Registered Children (${registry.length})</span>
              </h2>
              <p class="text-xs text-[#687286] mt-1 font-medium break-words">Select a student profile to launch assessment or view full evaluation matrix</p>
            </div>
          </div>

          <!-- Children Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            ${childrenCardsHtml}
            ${addNewChildCardHtml}
          </div>
        </div>

        <!-- Insights & Guidance Section -->
        <div id="parent-insights-section" class="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E4DDD3] shadow-[0_14px_35px_rgba(31,41,55,0.08)] min-w-0 break-words">
          <h3 class="text-lg font-serif font-bold text-[#17233D] mb-6 flex items-center gap-2.5 break-words">
            <i class="fa-solid fa-lightbulb text-amber-500 shrink-0"></i>
            <span class="break-words">Understanding CodeRa's AI Evaluation Engine</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            <div class="p-5 rounded-2xl bg-[#F6F3EE] border border-[#E4DDD3] flex items-start gap-4 min-w-0 break-words h-full">
              <div class="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#6264F2] flex items-center justify-center text-xl font-bold shrink-0">
                🎯
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-serif font-bold text-[#17233D] text-sm mb-1 break-words">50-Question Dynamic Assessment</h4>
                <p class="text-xs text-[#687286] leading-relaxed font-medium break-words">
                  Adaptive challenges measuring logical thinking, spatial reasoning, algorithmic problem-solving, and digital dexterity.
                </p>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-[#F6F3EE] border border-[#E4DDD3] flex items-start gap-4 min-w-0 break-words h-full">
              <div class="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#159E99] flex items-center justify-center text-xl font-bold shrink-0">
                🧠
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-serif font-bold text-[#17233D] text-sm mb-1 break-words">Inclusive Accommodations</h4>
                <p class="text-xs text-[#687286] leading-relaxed font-medium break-words">
                  Tailored support for ADHD, Autism, Dyslexia, and speech delay with rest breaks, audio narration, and visual cues.
                </p>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-[#F6F3EE] border border-[#E4DDD3] flex items-start gap-4 min-w-0 break-words h-full">
              <div class="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#6264F2] flex items-center justify-center text-xl font-bold shrink-0">
                📊
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-serif font-bold text-[#17233D] text-sm mb-1 break-words">Exportable Real-Time Matrix</h4>
                <p class="text-xs text-[#687286] leading-relaxed font-medium break-words">
                  Detailed skill breakdowns across 6 competency domains with one-click official PDF placement report downloads.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach Event Listeners
  const homeBtn = container.querySelector('#parentHubHomeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => returnToLandingPage());
  }

  const addBtnCard = container.querySelector('#addNewChildBtnCard');
  if (addBtnCard) {
    addBtnCard.addEventListener('click', openNewChildModal);
  }

  const topAddBtn = container.querySelector('#topAddNewChildBtn');
  if (topAddBtn) {
    topAddBtn.addEventListener('click', openNewChildModal);
  }

  const topAddBtnHeader = container.querySelector('#topAddNewChildBtnHeader');
  if (topAddBtnHeader) {
    topAddBtnHeader.addEventListener('click', openNewChildModal);
  }

  // View Report Buttons
  container.querySelectorAll('.view-child-report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-child-report');
      const session = sessions.find(s => s.student_name.toLowerCase().trim() === (name || '').toLowerCase().trim()) || sessions[0];
      if (session) {
        const placement = PlacementEngine.evaluatePlacement(
          session.total_score,
          session.domain_scores,
          session.item_telemetries,
          session.schema_version || '2.0'
        );
        renderReportDashboard(container, session, placement);
      }
    });
  });

  // Book Now Payment Gateway Buttons
  container.querySelectorAll('.book-now-payment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.getAttribute('data-child-track') || 'Foundational Coder (L1)';
      const modal = new PaymentModal(() => {
        renderParentDashboard(container);
      });
      modal.open(track, '$299');
    });
  });

  // Start Assessment Buttons -> Trigger Pre-Launch Confirmation Pop-up Modal
  container.querySelectorAll('.start-child-test-btn, .retake-child-test-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-child-start') || btn.getAttribute('data-child-retake') || 'Alex Rivers';
      localStorage.setItem('codera_last_student_name', name);
      
      // Trigger Assessment Pre-Launch Confirmation Pop-up Modal
      if (typeof (window as any).openModal === 'function') {
        (window as any).openModal('childConfirmModal');
      } else {
        const modal = document.getElementById('childConfirmModal');
        const overlay = document.getElementById('modalOverlay');
        if (overlay && modal) {
          overlay.classList.remove('hidden', 'opacity-0');
          modal.classList.remove('hidden', 'scale-95');
        }
      }
    });
  });
}
