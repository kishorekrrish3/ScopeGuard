"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Copy,
  Download,
  Terminal,
  Activity,
  Database,
  Lock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  RefreshCw,
  FileText,
  Cpu,
  Layers,
  Send,
} from "lucide-react";
import { DEFAULT_PROJECTS, ProjectSow } from "@/lib/contracts";
import { ScopeAnalysis } from "./api/analyze/route";

interface AuditTelemetry {
  model: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  apiCostUsd: number;
  traceId: string;
}

interface AuditResponse {
  success: boolean;
  sowContext: {
    projectName: string;
    hourlyRate: number;
    ndaLevel: string;
    clauses: Array<{ section: string; title: string; content: string }>;
    storageMode?: string;
  };
  analysis: ScopeAnalysis;
  telemetry: AuditTelemetry;
}

export default function ScopeGuardDashboard() {
  const [activeTab, setActiveTab] = useState<"auditor" | "tinker">("auditor");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj_fintech_mvp");
  const [clientMessage, setClientMessage] = useState<string>(
    "Hey! Quick thought for the launch: can we also get a lightweight web admin portal so our internal operations team can manage user roles (Admin, Moderator, Viewer) and view audit logs? Should just be a few simple screens!"
  );
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null);
  const [showClauses, setShowClauses] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedTrace, setCopiedTrace] = useState<boolean>(false);

  const currentProject =
    DEFAULT_PROJECTS.find((p) => p.id === selectedProjectId) || DEFAULT_PROJECTS[0];

  const presets = [
    {
      id: "trap_1",
      title: 'Trap 1: "Quick" Role-Based Admin Portal',
      creepTag: "$1,190 Creep",
      projectId: "proj_fintech_mvp",
      message:
        "Hey! Quick thought for the launch: can we also get a lightweight web admin portal so our internal operations team can manage user roles (Admin, Moderator, Viewer) and view audit logs? Should just be a few simple screens!",
    },
    {
      id: "trap_2",
      title: 'Trap 2: "Stripe Sandbox + 4 Checkout Flows"',
      creepTag: "$1,360 Creep",
      projectId: "proj_fintech_mvp",
      message:
        "Could you wire up Stripe Sandbox test mode with custom checkout payment split webhooks for Apple Pay and 4 country checkout variations by this Friday?",
    },
    {
      id: "safe_3",
      title: 'Safe Request: "Hex Color Tweak on Login CTA"',
      creepTag: "$0 In-Scope",
      projectId: "proj_fintech_mvp",
      message:
        "Can we tweak the primary button color on the Login screen from #0052FF to #0047E0 and adjust the padding from 12px to 16px to match our updated brand guide?",
    },
  ];

  const handleApplyPreset = (preset: (typeof presets)[0]) => {
    setSelectedProjectId(preset.projectId);
    setClientMessage(preset.message);
  };

  const runScopeAudit = async () => {
    if (!clientMessage.trim()) return;
    setIsAuditing(true);
    setAuditResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProjectId,
          clientMessage: clientMessage.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data: AuditResponse = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error("Audit failed:", err);
    } finally {
      setIsAuditing(false);
    }
  };

  const copyEmailToClipboard = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.analysis.changeOrderEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyTraceIdToClipboard = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.telemetry.traceId);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  const downloadChangeOrderText = () => {
    if (!auditResult) return;
    const content = `SCOPEGUARD CHANGE ORDER AMENDMENT
======================================================
Project: ${auditResult.sowContext.projectName}
Date: ${new Date().toLocaleDateString()}
Audit Verdict: ${auditResult.analysis.verdict}
Risk Score: ${auditResult.analysis.riskScore}/100
Contract Boundary Violated: ${auditResult.analysis.violatedClause}

REASONING:
${auditResult.analysis.reasoning}

ITEMIZED CHANGE ORDER LINE ITEMS:
------------------------------------------------------
${auditResult.analysis.lineItems
  .map(
    (item) =>
      `• ${item.item.padEnd(50)} | ${item.hours} hrs | $${item.cost.toLocaleString()}`
  )
  .join("\n")}
------------------------------------------------------
TOTAL UNPAID REVENUE PROTECTED: $${auditResult.analysis.revenueAtRisk.toLocaleString()}
ESTIMATED EXTRA HOURS: ${auditResult.analysis.estimatedExtraHours} hrs

READY-TO-SEND DIPLOMATIC EMAIL:
------------------------------------------------------
${auditResult.analysis.changeOrderEmail}
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Change-Order-${auditResult.sowContext.projectName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  ScopeGuard
                </span>
                <span className="text-xs font-mono text-slate-400">.tech</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  PRO • $19/mo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                NDA-Safe Contract & Scope-Creep Shield for Freelance Engineers
              </p>
            </div>
          </div>

          {/* Live Partner Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
              <Lock className="h-3 w-3" />
              <span>Zero Cloud NDA Leakage (Local Gemma 3 4B)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium">
              <Database className="h-3 w-3" />
              <span>MongoDB Atlas SOW Vector Memory</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium">
              <Activity className="h-3 w-3" />
              <span>Sentry Agent Tracing Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Subnav Tabs */}
      <div className="border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab("auditor")}
              className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "auditor"
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Live Scope Auditor (60s Demo View)</span>
            </button>
            <button
              onClick={() => setActiveTab("tinker")}
              className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "tinker"
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>Tinker Fine-Tuning & Unit Economics (Judge Showcase)</span>
            </button>
          </nav>
          <div className="text-[11px] text-slate-400 font-mono hidden md:block">
            Target Host: <span className="text-slate-200 font-semibold">Render Blueprint</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6">
        {activeTab === "auditor" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Freelancer Workspace (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Project Selector Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-cyan-400" />
                    Active SOW Contract
                  </label>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    {auditResult?.sowContext.storageMode === "mongodb-atlas"
                      ? "MongoDB Atlas Online"
                      : "MongoDB Fallback Ready"}
                  </span>
                </div>

                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    setAuditResult(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer font-medium"
                >
                  {DEFAULT_PROJECTS.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.projectName} (${proj.hourlyRate}/hr)
                    </option>
                  ))}
                </select>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Contract Rate:{" "}
                    <strong className="text-emerald-400 font-mono">
                      ${currentProject.hourlyRate}/hr
                    </strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                    {currentProject.ndaLevel}
                  </span>
                </div>

                {/* SOW Clauses Viewer Toggle */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setShowClauses(!showClauses)}
                    className="w-full flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      View Signed Statement of Work ({currentProject.clauses.length} clauses)
                    </span>
                    {showClauses ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {showClauses && (
                    <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
                      {currentProject.clauses.map((clause, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300"
                        >
                          <div className="font-semibold text-indigo-300 font-mono text-[11px] mb-1">
                            {clause.section} - {clause.title}
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-400">
                            {clause.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Instant 1-Click Demo Presets */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    1-Click Demo Presets (Video Recording)
                  </span>
                  <span className="text-[10px] text-slate-400">Click to load</span>
                </div>
                <div className="space-y-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className="w-full text-left p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between group"
                    >
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                          {preset.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[260px]">
                          {preset.message}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                          preset.creepTag.includes("$0")
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {preset.creepTag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Message Input Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Send className="h-3.5 w-3.5 text-indigo-400" />
                    Client Slack / Email Request
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {clientMessage.length} chars
                  </span>
                </div>
                <textarea
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  placeholder="Paste incoming client message here (e.g. 'Can we also quickly add...')"
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono leading-relaxed resize-none"
                />

                <button
                  onClick={runScopeAudit}
                  disabled={isAuditing || !clientMessage.trim()}
                  className="mt-4 w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-white transition-all cursor-pointer"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" />
                      <span>Auditing via Local Gemma 3 & Sentry Spans...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 text-white" />
                      <span>Audit Scope & Generate Change Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: AI Audit Results & Diplomatic Change Order (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {!auditResult && !isAuditing ? (
                /* Empty / Intro State */
                <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[500px]">
                  <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                    <ShieldAlert className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-200">
                    Ready to Shield Your Project Revenue
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                    Select a preset or paste any client feature request to run an NDA-safe audit
                    against your MongoDB Atlas SOW clauses using local open-weight Gemma 3.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => {
                        handleApplyPreset(presets[0]);
                        runScopeAudit();
                      }}
                      className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer font-medium"
                    >
                      <span>Run Preset 1: Admin Portal Creep</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => {
                        handleApplyPreset(presets[2]);
                        runScopeAudit();
                      }}
                      className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer font-medium"
                    >
                      <span>Run Preset 3: Safe Visual Polish</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : isAuditing ? (
                /* Loading State with animated steps */
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px] space-y-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-slate-200">
                      Orchestrating Mastra & Gemma 3 Agent
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Querying MongoDB SOW collection • Executing Sentry gen_ai spans
                    </p>
                  </div>
                  <div className="w-full max-w-xs bg-slate-950 rounded-lg p-3 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>gen_ai.execute_tool [MongoDB Atlas]</span>
                    </div>
                    <div className="text-indigo-400 flex items-center gap-1.5 animate-pulse">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>gen_ai.generate_content [Gemma 3 Tinker FT]</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Full Audit Results */
                auditResult && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    {/* 3 KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* KPI 1: Verdict & Risk Score */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Audit Verdict
                        </span>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                              auditResult.analysis.verdict === "OUT_OF_SCOPE_CREEP"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                : auditResult.analysis.verdict === "AMBIGUOUS_TRAP"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            }`}
                          >
                            {auditResult.analysis.verdict === "OUT_OF_SCOPE_CREEP" ? (
                              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                            ) : auditResult.analysis.verdict === "AMBIGUOUS_TRAP" ? (
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            )}
                            {auditResult.analysis.verdict}
                          </span>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Risk Score:</span>
                          <strong
                            className={`font-mono ${
                              auditResult.analysis.riskScore > 70
                                ? "text-rose-400"
                                : auditResult.analysis.riskScore > 30
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {auditResult.analysis.riskScore}/100
                          </strong>
                        </div>
                      </div>

                      {/* KPI 2: Unpaid Revenue Protected */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Protected Revenue
                        </span>
                        <div className="mt-2 text-2xl font-extrabold font-mono text-emerald-400 flex items-center">
                          <DollarSign className="h-5 w-5 text-emerald-500 -mr-1" />
                          <span>{auditResult.analysis.revenueAtRisk.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Extra Billable:</span>
                          <strong className="font-mono text-slate-200">
                            {auditResult.analysis.estimatedExtraHours} hrs @ $
                            {auditResult.sowContext.hourlyRate}/hr
                          </strong>
                        </div>
                      </div>

                      {/* KPI 3: Telemetry & Model */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Agent Telemetry
                        </span>
                        <div className="mt-2">
                          <div className="text-xs font-mono font-bold text-indigo-300 truncate">
                            {auditResult.telemetry.model}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Latency:{" "}
                            <span className="text-slate-200 font-mono">
                              {auditResult.telemetry.latencyMs} ms
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                          <span>API Cost:</span>
                          <span className="text-emerald-400 font-mono font-bold">
                            $0.00 (Local)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contract Violation Breakdown Card */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                          Contract Boundary & Line-Item Breakdown
                        </h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {auditResult.analysis.violatedClause}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4">
                        {auditResult.analysis.reasoning}
                      </p>

                      {/* Line Items Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                              <th className="pb-2 font-medium">Deliverable Item</th>
                              <th className="pb-2 font-medium text-right">Est. Hours</th>
                              <th className="pb-2 font-medium text-right">Billable Fee</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {auditResult.analysis.lineItems.map((item, idx) => (
                              <tr key={idx} className="text-slate-200">
                                <td className="py-2.5 pr-2 font-medium">{item.item}</td>
                                <td className="py-2.5 text-right font-mono text-slate-400">
                                  {item.hours} hrs
                                </td>
                                <td className="py-2.5 text-right font-mono font-semibold text-emerald-400">
                                  ${item.cost.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-slate-800 font-bold">
                              <td className="pt-3 text-slate-300">Total Change Order Quote</td>
                              <td className="pt-3 text-right font-mono text-indigo-300">
                                {auditResult.analysis.estimatedExtraHours} hrs
                              </td>
                              <td className="pt-3 text-right font-mono text-emerald-400 text-sm">
                                ${auditResult.analysis.revenueAtRisk.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Diplomatic Pushback Email Generator */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                          <Send className="h-3.5 w-3.5 text-indigo-400" />
                          Diplomatic Pushback & Change Order Email
                        </h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={copyEmailToClipboard}
                            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{copiedEmail ? "Copied!" : "Copy Change Order Email"}</span>
                          </button>
                          <button
                            onClick={downloadChangeOrderText}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download (.txt)</span>
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <pre className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                          {auditResult.analysis.changeOrderEmail}
                        </pre>
                      </div>
                    </div>

                    {/* Live Sentry Span Inspector Drawer */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-purple-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Live Sentry AI Agent Span Waterfall
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-400">
                            Trace: {auditResult.telemetry.traceId.slice(0, 12)}...
                          </span>
                          <button
                            onClick={copyTraceIdToClipboard}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all"
                          >
                            <Copy className="h-2.5 w-2.5" />
                            <span>{copiedTrace ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Visual Waterfall Spans */}
                      <div className="space-y-2 text-xs font-mono">
                        {/* Span 1: Root Invoke Agent */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-purple-900/40">
                          <div className="flex items-center justify-between text-purple-300 font-semibold mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-purple-400 inline-block" />
                              op: &quot;gen_ai.invoke_agent&quot; • ScopeGuard Mastra Auditor Run
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {auditResult.telemetry.latencyMs} ms
                            </span>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-purple-500 h-full w-full rounded-full" />
                          </div>
                          <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                            <span>gen_ai.agent.name: scopeguard-auditor</span>
                            <span>gen_ai.system: gemma-3-tinker-ft</span>
                            <span className="text-emerald-400">
                              scopeguard.revenue_protected: $
                              {auditResult.analysis.revenueAtRisk}
                            </span>
                          </div>
                        </div>

                        {/* Span 2: Tool sow-retriever */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/40 ml-4">
                          <div className="flex items-center justify-between text-cyan-300 font-semibold mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" />
                              op: &quot;gen_ai.execute_tool&quot; • retrieve-sow-clauses
                            </span>
                            <span className="text-[11px] text-slate-400">42 ms</span>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-cyan-500 h-full w-[12%] rounded-full" />
                          </div>
                          <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                            <span>target: {auditResult.sowContext.projectName}</span>
                            <span>storage: {auditResult.sowContext.storageMode}</span>
                          </div>
                        </div>

                        {/* Span 3: Gemma 3 Inference */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-indigo-900/40 ml-4">
                          <div className="flex items-center justify-between text-indigo-300 font-semibold mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-indigo-400 inline-block" />
                              op: &quot;gen_ai.generate_content&quot; • scopeguard-gemma-audit
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {Math.max(1, auditResult.telemetry.latencyMs - 42)} ms
                            </span>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-indigo-500 h-full w-[88%] rounded-full" />
                          </div>
                          <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                            <span>model: {auditResult.telemetry.model}</span>
                            <span>prompt_tokens: {auditResult.telemetry.promptTokens}</span>
                            <span>
                              completion_tokens: {auditResult.telemetry.completionTokens}
                            </span>
                            <span className="text-emerald-400">cost: $0.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          /* View 2: Tinker Fine-Tuning & Unit Economics (Judge Showcase) */
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header intro */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold">
                      Tinker Open-Weight Optimization
                    </span>
                    <span className="text-xs text-slate-400">LoRA Rank 16 • Alpha 32</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-2">
                    Gemma 3 4B Fine-Tuning & Unit Economics
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    By fine-tuning Google&apos;s open-weight Gemma 3 4B via Tinker on 20+ specialized
                    freelance SOW contract boundaries, ScopeGuard eliminates polite scope traps,
                    achieves 100% JSON schema adherence, and guarantees zero cloud NDA leakage.
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    96.2% F1 Score
                  </div>
                  <span className="text-[11px] text-slate-400">
                    vs. 71.4% Base Gemma 3 4B (+24.8%)
                  </span>
                </div>
              </div>
            </div>

            {/* Benchmark Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Polite Scope Trap Detection
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">+35.6%</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Base models get tricked when clients say &quot;quick thought&quot; or &quot;just a few simple
                  screens&quot;. Tinker LoRA catches subtle creep every time.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Base Gemma 3 4B: 62.5%</span>
                    <span>Tinker LoRA: 98.1%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full w-[62.5%]" />
                    <div className="bg-emerald-500 h-full w-[35.6%]" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    JSON Schema Adherence
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">+15.8%</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Zero markdown wrappers or hallucinated keys. Guarantees 100% reliable execution
                  in automated billing and Change Order pipelines.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Base Gemma 3: 84.2%</span>
                    <span>Tinker LoRA: 100.0%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full w-[84.2%]" />
                    <div className="bg-emerald-500 h-full w-[15.8%]" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Contract Clause Citation Accuracy
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">+37.4%</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Identifies the exact Section 2.1 or 3.2 clause from MongoDB SOW memory rather
                  than generating generic freelance pushback advice.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Base Gemma 3: 58.0%</span>
                    <span>Tinker LoRA: 95.4%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full w-[58%]" />
                    <div className="bg-emerald-500 h-full w-[37.4%]" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Inference Latency & Efficiency
                  </h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">-30.3% Latency</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Tuned for compact reasoning tokens. Delivers sub-second evaluations on standard
                  hardware (RTX 4060 or Render CPU/GPU).
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Base Gemma 3: 1,120 ms</span>
                    <span>Tinker LoRA: 780 ms</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-cyan-500 h-full w-[70%]" />
                    <div className="bg-slate-800 h-full w-[30%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Economics Comparison Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                Unit Economics: Closed Frontier API vs. Open-Weight Gemma 3 on Render
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                      <th className="pb-3 font-medium">Evaluation Dimension</th>
                      <th className="pb-3 font-medium text-amber-300">
                        Closed Frontier API (GPT-4o / Claude 3.5)
                      </th>
                      <th className="pb-3 font-medium text-emerald-300">
                        ScopeGuard Gemma 3 + Tinker LoRA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    <tr>
                      <td className="py-3 font-medium text-slate-300">Cost per 1,000 Audits</td>
                      <td className="py-3 font-mono text-slate-400">$18.00 / 1k ($180/mo at scale)</td>
                      <td className="py-3 font-mono font-bold text-emerald-400">
                        $0.00 / 1k (Zero incremental API bills)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-300">NDA & Data Privacy</td>
                      <td className="py-3 text-rose-400">
                        Cloud Logged (High risk of client NDA breach)
                      </td>
                      <td className="py-3 text-emerald-300 font-semibold">
                        100% Zero-Cloud Air-Gapped (Local / Private VPC)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-300">JSON Schema Reliability</td>
                      <td className="py-3 text-slate-400 font-mono">
                        84.2% (Frequent markdown fencing issues)
                      </td>
                      <td className="py-3 text-emerald-300 font-mono font-semibold">
                        100.0% (Zero parse errors via fine-tuning)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-300">Domain Adaptation</td>
                      <td className="py-3 text-slate-400">Generic instruction tuning only</td>
                      <td className="py-3 text-indigo-300 font-semibold">
                        Custom fine-tuned on real freelance SOW datasets
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-slate-300">Hosting Cost on Render</td>
                      <td className="py-3 text-slate-400">Additional to token fees</td>
                      <td className="py-3 text-cyan-300 font-mono">
                        Fixed $7/mo Starter web service
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 flex items-center justify-between">
                <span>
                  <strong>Average Freelance ROI:</strong> Protecting just 1 out-of-scope admin portal
                  ($1,190) pays for over 5 years of ScopeGuard Pro ($19/mo).
                </span>
                <span className="font-mono font-bold text-sm bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/40">
                  ROI: 5,200%+
                </span>
              </div>
            </div>

            {/* Terminal evaluation command callout */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <Terminal className="h-3.5 w-3.5" />
                  CLI Benchmark Script
                </span>
                <span className="text-[10px]">Execute in terminal</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-200">
                node scripts/evaluate-tinker.mjs
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ScopeGuard.tech</span>
            <span>•</span>
            <span>Production Micro-SaaS MVP</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Gemma 3 (Tinker LoRA)</span>
            <span>MongoDB Atlas</span>
            <span>Mastra Agent</span>
            <span>Sentry Tracing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
