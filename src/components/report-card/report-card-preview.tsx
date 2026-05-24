import { SchoolLogo } from "@/components/ui/school-logo";
import {
  currentStudent,
  studentGrades,
  observedValues,
  attendanceRecords,
  gradingScale,
} from "@/lib/data/mock-data";
import { SCHOOL_NAME, SCHOOL_ID } from "@/lib/constants";

export function ReportCardPreview() {
  return (
    <div className="bg-white text-neutral-900 text-xs sm:text-sm border border-neutral-300 shadow-md">
      <div className="border-b border-neutral-400 p-4 text-center space-y-1">
        <p className="text-[10px] sm:text-xs uppercase tracking-wide">Republic of the Philippines</p>
        <p className="text-[10px] sm:text-xs font-semibold">Department of Education</p>
        <p className="text-xs sm:text-sm font-bold uppercase">{SCHOOL_NAME}</p>
        <p className="text-[10px] sm:text-xs">City of Mati, Davao Oriental</p>
        <p className="text-[10px] sm:text-xs">School ID: {SCHOOL_ID}</p>
        <div className="flex justify-center my-2">
          <SchoolLogo size={56} />
        </div>
        <p className="font-bold text-sm sm:text-base mt-2">Report on Learning Progress and Achievement</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 p-4 border-b border-neutral-300 text-[11px] sm:text-xs">
        <p className="break-words"><span className="font-semibold">Name:</span> {currentStudent.name.toUpperCase()}</p>
        <p><span className="font-semibold">Age:</span> 17</p>
        <p><span className="font-semibold">Sex:</span> Male</p>
        <p><span className="font-semibold">Grade:</span> {currentStudent.gradeLevel}</p>
        <p><span className="font-semibold">Section:</span> STEM A</p>
        <p><span className="font-semibold">LRN:</span> {currentStudent.lrn}</p>
        <p className="col-span-2 sm:col-span-3"><span className="font-semibold">School Year:</span> {currentStudent.schoolYear}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-[10px] sm:text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-100 border-b border-neutral-400">
              <th className="border border-neutral-300 p-1.5 text-left font-semibold">Learning Areas</th>
              <th className="border border-neutral-300 p-1 text-center w-10">Q1</th>
              <th className="border border-neutral-300 p-1 text-center w-10">Q2</th>
              <th className="border border-neutral-300 p-1 text-center w-10">Q3</th>
              <th className="border border-neutral-300 p-1 text-center w-10">Q4</th>
              <th className="border border-neutral-300 p-1 text-center w-14">Final Grade</th>
              <th className="border border-neutral-300 p-1 text-center w-16">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {studentGrades.map((g) => (
              <tr key={g.subject}>
                <td className="border border-neutral-300 p-1.5">{g.subject}</td>
                <td className="border border-neutral-300 p-1 text-center">{g.q1}</td>
                <td className="border border-neutral-300 p-1 text-center">{g.q2}</td>
                <td className="border border-neutral-300 p-1 text-center">{g.q3}</td>
                <td className="border border-neutral-300 p-1 text-center">{g.q4}</td>
                <td className="border border-neutral-300 p-1 text-center font-semibold">{g.final}</td>
                <td className="border border-neutral-300 p-1 text-center text-[10px]">{g.remarks}</td>
              </tr>
            ))}
            <tr className="bg-neutral-50 font-bold">
              <td className="border border-neutral-300 p-1.5" colSpan={5}>General Average</td>
              <td className="border border-neutral-300 p-1 text-center">{currentStudent.gwa.toFixed(2)}</td>
              <td className="border border-neutral-300 p-1 text-center">PASSED</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-3 border-b border-neutral-300">
        <p className="font-semibold mb-1 text-[10px] sm:text-xs">Descriptors and Grading Scale</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 text-[9px] sm:text-[10px]">
          {gradingScale.map((g) => (
            <div key={g.range} className="border border-neutral-200 p-1 rounded">
              <span className="font-medium">{g.range}</span> — {g.label}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-b border-neutral-300 overflow-x-auto">
        <p className="font-semibold mb-2 text-[10px] sm:text-xs">Report on Learner&apos;s Observed Values</p>
        <table className="w-full min-w-[480px] text-[9px] sm:text-[10px] border-collapse">
          <thead>
            <tr className="bg-neutral-100">
              <th className="border border-neutral-300 p-1 text-left">Core Values</th>
              <th className="border border-neutral-300 p-1 text-left">Behavior Statements</th>
              <th className="border border-neutral-300 p-1 w-8">Q1</th>
              <th className="border border-neutral-300 p-1 w-8">Q2</th>
              <th className="border border-neutral-300 p-1 w-8">Q3</th>
              <th className="border border-neutral-300 p-1 w-8">Q4</th>
            </tr>
          </thead>
          <tbody>
            {observedValues.map((v, i) => (
              <tr key={i}>
                <td className="border border-neutral-300 p-1 font-medium">{v.coreValue}</td>
                <td className="border border-neutral-300 p-1 break-words max-w-[180px]">{v.statement}</td>
                <td className="border border-neutral-300 p-1 text-center">{v.q1}</td>
                <td className="border border-neutral-300 p-1 text-center">{v.q2}</td>
                <td className="border border-neutral-300 p-1 text-center">{v.q3}</td>
                <td className="border border-neutral-300 p-1 text-center">{v.q4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[9px] text-neutral-500 mt-1">AO — Always Observed · SO — Sometimes Observed · RO — Rarely Observed · NO — Not Observed</p>
      </div>

      <div className="p-3 border-b border-neutral-300 overflow-x-auto">
        <p className="font-semibold mb-2 text-[10px] sm:text-xs">Report on Attendance</p>
        <table className="w-full min-w-[600px] text-[9px] sm:text-[10px] border-collapse">
          <thead>
            <tr className="bg-neutral-100">
              <th className="border border-neutral-300 p-1 text-left"></th>
              {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "Total"].map((m) => (
                <th key={m} className="border border-neutral-300 p-1 text-center">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((row) => (
              <tr key={row.label}>
                <td className="border border-neutral-300 p-1 font-medium whitespace-nowrap">{row.label}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.jun || "—"}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.jul}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.aug}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.sep}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.oct}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.nov}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.dec}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.jan}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.feb}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.mar}</td>
                <td className="border border-neutral-300 p-1 text-center">{row.apr || "—"}</td>
                <td className="border border-neutral-300 p-1 text-center font-semibold">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6 text-[10px] sm:text-xs">
        <div className="text-center">
          <div className="border-b border-neutral-400 mb-1 h-8" />
          <p className="font-semibold">{currentStudent.adviser}</p>
          <p className="text-neutral-500">Class Adviser</p>
        </div>
        <div className="text-center">
          <div className="border-b border-neutral-400 mb-1 h-8" />
          <p className="font-semibold">Mrs. Jessica M. Lumapas</p>
          <p className="text-neutral-500">School Principal</p>
        </div>
      </div>
    </div>
  );
}

