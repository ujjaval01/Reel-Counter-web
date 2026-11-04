import React from 'react';
import LegalLayout from '../components/LegalLayout';
import {
  Eye, EyeOff, Smartphone, Layers, Database, Lock,
  CheckCircle2, Info, Mail, Globe, Cloud, UserX, FileText,
  ExternalLink, Sparkles, Sliders
} from 'lucide-react';

const SECTIONS = [
  { id: 'section-1', number: '1', title: 'Introduction' },
  { id: 'section-2', number: '2', title: 'About the Developer' },
  { id: 'section-3', number: '3', title: 'Information We Process' },
  { id: 'section-4', number: '4', title: 'Accessibility Service Disclosure' },
  { id: 'section-5', number: '5', title: 'Floating Overlay Permission' },
  { id: 'section-6', number: '6', title: 'Local Data Storage' },
  { id: 'section-7', number: '7', title: 'Google Sign-In and Firebase' },
  { id: 'section-8', number: '8', title: 'How We Use Information' },
  { id: 'section-9', number: '9', title: 'Third-Party Services and Data Sharing' },
  { id: 'section-10', number: '10', title: 'Data Security' },
  { id: 'section-11', number: '11', title: 'Data Retention' },
  { id: 'section-12', number: '12', title: 'Data Deletion and User Choices' },
  { id: 'section-13', number: '13', title: 'Children\'s Privacy' },
  { id: 'section-14', number: '14', title: 'International Data Processing' },
  { id: 'section-15', number: '15', title: 'Changes to This Policy' },
  { id: 'section-16', number: '16', title: 'Contact Us' },
];

export default function PrivacyPolicy() {
  const cardClasses = 'bg-[#262238] border border-[#3B3456] rounded-2xl p-5 text-slate-300';
  const headingClasses = 'text-white font-bold';
  const subtextClasses = 'text-slate-300 text-sm leading-relaxed';
  const dividerClasses = 'border-t border-[#312B4A] pt-8';

  return (
    <LegalLayout
      title="Privacy Policy"
      description="Official, audit-based Privacy Policy for Reel Counter (com.uv.reelcounter) by Ujjaval Saini. Transparent disclosures covering our on-device Accessibility Service, floating overlay, guest mode local storage, and optional Google Sign-In with Firebase."
      effectiveDate="November 4, 2026"
      lastUpdated="November 4, 2026"
    >
      {/* 4 CORE ARCHITECTURE HIGHLIGHT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${cardClasses} flex flex-col justify-between hover:border-[#7C3AED]/50 transition-colors`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>On-Device Detection</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Accessibility service inspects UI node metadata in volatile memory strictly to count scrolls. No screen text or media is captured.
            </p>
          </div>
        </div>

        <div className={`${cardClasses} flex flex-col justify-between hover:border-[#7C3AED]/50 transition-colors`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>Floating Overlay</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              The overlay permission is used solely to display your active count on top of the screen, never to read background screen contents.
            </p>
          </div>
        </div>

        <div className={`${cardClasses} flex flex-col justify-between hover:border-[#7C3AED]/50 transition-colors`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold">
              <UserX className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>Guest Mode by Default</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Core counting works locally without signing in. Platform counts, daily goals, and totals reside strictly on your device.
            </p>
          </div>
        </div>

        <div className={`${cardClasses} flex flex-col justify-between hover:border-[#7C3AED]/50 transition-colors`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>No Ad Trackers</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Static audit verified no AdMob, advertising SDKs, Firebase Analytics, or Crashlytics in the inspected project.
            </p>
          </div>
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
      <section aria-labelledby="toc-heading" className="p-6 sm:p-8 rounded-3xl border border-[#3B3456] bg-[#262238] shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 id="toc-heading" className={`text-xl font-extrabold tracking-tight ${headingClasses}`}>
              Table of Contents
            </h2>
            <p className="text-xs text-slate-400">Jump directly to any section of this Privacy Policy</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs font-medium">
          {SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex items-baseline gap-2.5 py-1 text-slate-300 hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded px-1 -mx-1"
            >
              <span className="font-mono text-[#7C3AED] font-bold w-5 shrink-0">{sec.number}.</span>
              <span className="truncate">{sec.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 1: INTRODUCTION */}
      <section id="section-1" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            1
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Introduction
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Welcome to <strong>Reel Counter</strong>. Reel Counter is an Android digital wellbeing and screen-time awareness application created to help users monitor, understand, and reduce repetitive short-form video consumption across supported social media applications.
          </p>
          <p className="mb-3">
            This Privacy Policy explains what information is processed by the app, where data is stored, and what user choices are available. We operate on a <strong>local-first principle</strong>: core video counting functionality runs directly on your device without requiring you to register, sign in, or provide personal credentials.
          </p>
          <p>
            Please read this policy carefully to understand our technical implementation and data handling practices.
          </p>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE DEVELOPER */}
      <section id="section-2" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            2
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            About the Developer
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-4">
            Reel Counter is developed, published, and maintained by <strong>Ujjaval Saini</strong>.
          </p>
          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block mb-0.5">Application Name:</span>
                <strong className="text-white text-sm">Reel Counter</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Android Package Name:</span>
                <code className="text-purple-300 font-mono text-xs">com.uv.reelcounter</code>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Developer / Publisher:</span>
                <strong className="text-white text-sm">Ujjaval Saini</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Official Website:</span>
                <a href="https://reelcounter.vercel.app/" className="text-purple-300 hover:underline">
                  https://reelcounter.vercel.app/
                </a>
              </div>
            </div>
            <div className="pt-2 border-t border-[#3B3456]">
              <span className="text-slate-400 block mb-0.5">Privacy Contact Email:</span>
              <a href="mailto:sainiujvl@gmail.com" className="text-purple-300 font-mono bg-[#1E1B2E] px-2 py-0.5 rounded border border-[#3B3456] hover:underline inline-block">
                sainiujvl@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INFORMATION WE PROCESS */}
      <section id="section-3" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            3
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Information We Process
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-4">
            Based on our verified static audit, Reel Counter processes information according to the following categories:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#3B3456] mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1E1B2E] text-slate-200">
                <tr>
                  <th className="p-3.5 font-bold border-b border-[#3B3456]">Category</th>
                  <th className="p-3.5 font-bold border-b border-[#3B3456]">Specific Data Items</th>
                  <th className="p-3.5 font-bold border-b border-[#3B3456]">Processing Location</th>
                  <th className="p-3.5 font-bold border-b border-[#3B3456]">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#312B4A] bg-[#262238]">
                <tr>
                  <td className="p-3.5 font-semibold text-purple-300">UI Metadata & Scroll Events</td>
                  <td className="p-3.5">View IDs, node class names, container hierarchies, scroll events</td>
                  <td className="p-3.5">Ephemeral on-device memory (RAM)</td>
                  <td className="p-3.5">Detecting reel feeds & scroll gestures</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-purple-300">Local Usage Metrics</td>
                  <td className="p-3.5">Daily reel counts, platform breakdown, daily goals, historical totals</td>
                  <td className="p-3.5">Device local storage</td>
                  <td className="p-3.5">Tracking wellbeing stats & goal progress</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-purple-300">Overlay & UI Settings</td>
                  <td className="p-3.5">Floating counter screen coordinates, UI preferences</td>
                  <td className="p-3.5">Device local storage</td>
                  <td className="p-3.5">Persisting visual overlay position & theme</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-purple-300">Account Identity (Optional)</td>
                  <td className="p-3.5">Firebase UID, email address, display name, avatar URL</td>
                  <td className="p-3.5">Firebase Authentication & Firestore</td>
                  <td className="p-3.5">Authentication & social profile identification</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-purple-300">Synced Totals (Optional)</td>
                  <td className="p-3.5">Aggregate daily reel counts, historical daily totals</td>
                  <td className="p-3.5">Firebase Cloud Firestore</td>
                  <td className="p-3.5">Cross-device sync, Battle Mode, leaderboards</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] mb-4 space-y-3">
            <h3 className={`font-bold text-sm ${headingClasses}`}>Supported Applications</h3>
            <p className="text-xs text-slate-300">
              The static audit verifies that Reel Counter detects scrolling specifically in the following supported short-form video platforms:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] text-center font-semibold text-purple-300">
                Instagram
              </div>
              <div className="p-2.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] text-center font-semibold text-purple-300">
                YouTube Shorts
              </div>
              <div className="p-2.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] text-center font-semibold text-purple-300">
                Facebook Reels
              </div>
              <div className="p-2.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] text-center font-semibold text-purple-300">
                Snapchat Spotlight
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Note: Unverified platforms, including TikTok, are not included in this audit.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#221E33] space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Non-Collection Findings</span>
            </div>
            <p className="text-xs text-slate-300">
              The static codebase audit confirmed that Reel Counter does <strong>not</strong> collect or process:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 pl-1 text-slate-400">
              <li>GPS or network location data.</li>
              <li>Device contacts or address books.</li>
              <li>Camera or microphone audio/video recordings.</li>
              <li>Photos, images, or media library contents.</li>
              <li>Google Advertising ID (AAID).</li>
              <li>AdMob, Firebase Analytics, or Crashlytics tracking data.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: ACCESSIBILITY SERVICE DISCLOSURE (CLEARLY HIGHLIGHTED) */}
      <section id="section-4" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            4
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Accessibility Service Disclosure
          </h2>
        </div>

        {/* PROMINENT HIGHLIGHTED BOX */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-[#7C3AED] bg-[#2A2440] shadow-xl space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#7C3AED]/20 text-[#7C3AED] shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">Core Permission Disclosure</span>
              <h3 className="text-xl font-extrabold text-white">
                How Reel Counter Uses the Android Accessibility Service
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-200 leading-relaxed">
            <p>
              Reel Counter uses the Android <code className="font-mono text-xs bg-[#1E1B2E] px-1.5 py-0.5 rounded text-purple-300">AccessibilityService</code> API to detect relevant scrolling events and identify supported short-form video feeds (Instagram, YouTube Shorts, Facebook Reels, and Snapchat Spotlight).
            </p>
            <p>
              <strong>Why this permission is required:</strong> Android enforces strict security boundaries (sandboxing) between separate applications. An app cannot monitor when you scroll past video content in another app unless granted accessibility access. Reel Counter relies on this permission to recognize when a supported short-form video feed is open and when vertical scroll gestures occur, allowing it to increment your counter and track your daily goal.
            </p>
            <p>
              <strong>What the service processes on-device:</strong> The service processes relevant UI metadata, such as view IDs and node class names, locally in volatile memory to recognize video containers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1E1B2E] border border-[#3B3456] space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-purple-300">
              <EyeOff className="w-4 h-4 text-[#7C3AED]" />
              <span>Explicit Non-Collection Safeguards</span>
            </div>
            <p className="text-xs text-slate-300">
              According to the static audit, the Accessibility Service does <strong>NOT</strong> intentionally collect, store, or transmit:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 pl-2">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> No private messages or direct chats.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> No passwords or account credentials.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> No typed text or keystroke inputs.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> No video content or audio tracks.
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <span className="text-emerald-400 font-bold">✓</span> No screen recordings or captured screenshots.
              </li>
            </ul>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <p>
              <strong>Local Processing Only:</strong> Accessibility event information is processed locally on your device for reel detection. The audit does not identify transmission of these event details to Firebase or external servers.
            </p>
            <p>
              <strong>User Activation & Revocation:</strong> The Accessibility Service is never enabled automatically. You must explicitly grant it by navigating to:
            </p>
            <div className="p-2.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] font-mono text-xs text-purple-300 inline-block">
              Android Settings &gt; Accessibility &gt; Reel Counter &gt; Enable
            </div>
            <p>
              You can disable or revoke this permission at any time through the same Android system settings menu without losing your local counts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: FLOATING OVERLAY PERMISSION */}
      <section id="section-5" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            5
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Floating Overlay Permission
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter requests the <code className="font-mono text-xs bg-[#262238] px-1.5 py-0.5 rounded text-purple-300">SYSTEM_ALERT_WINDOW</code> permission, commonly referred to as "Display over other apps".
          </p>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 mb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Layers className="w-4 h-4 text-[#7C3AED]" />
              <span>Purpose of the Floating Overlay</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When enabled by the user, this permission allows Reel Counter to display a compact, floating counter widget directly over supported applications. This visual indicator provides real-time awareness of how many short videos you have watched during your active session.
            </p>
            <div className="p-3.5 rounded-xl bg-[#1E1B2E] border border-[#3B3456] text-xs text-slate-300">
              <strong className="text-purple-300 block mb-1">Important Privacy Distinction:</strong>
              This permission is used exclusively to visually display the floating counter on screen. It is <strong>NOT</strong> used to collect, capture, read, or inspect screen content from the underlying applications.
            </div>
          </div>

          <p className="text-xs text-slate-400">
            <strong>User Control:</strong> You can enable or disable the floating overlay at any time within Reel Counter's settings or through <code className="font-mono text-xs text-purple-300">Android Settings &gt; Apps &gt; Special app access &gt; Display over other apps &gt; Reel Counter</code>. The floating counter's on-screen coordinates are stored locally on your device to remember your preferred position.
          </p>
        </div>
      </section>

      {/* SECTION 6: LOCAL DATA STORAGE */}
      <section id="section-6" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            6
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Local Data Storage
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter is engineered to support a complete <strong>Guest Mode</strong>: users can access core counting functionality without signing in or linking an account.
          </p>
          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 mb-4">
            <h3 className={`font-bold text-xs uppercase tracking-wider ${headingClasses}`}>
              Locally Stored Data Elements:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Daily reel counts.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Platform-specific counts (IG, YT, FB, Snapchat).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Historical daily totals.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Daily goals and target limits.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Floating overlay screen position.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> User interface preferences (e.g., theme).
              </li>
            </ul>
          </div>
          <p className="mb-3 text-xs text-slate-300">
            <strong>Retention:</strong> This locally stored information is generally retained on the device until you reset metrics within the app, clear app data via <code className="font-mono text-xs text-purple-300">Android Settings &gt; Apps &gt; Reel Counter &gt; Storage &gt; Clear Data</code>, or uninstall the application.
          </p>
          <p className="text-xs text-slate-400">
            <strong>Storage Safeguards:</strong> Local data is stored within Reel Counter's private sandbox storage on Android. We do not make unsupported claims that every local value is individually encrypted with custom encryption at rest.
          </p>
        </div>
      </section>

      {/* SECTION 7: GOOGLE SIGN-IN AND FIREBASE */}
      <section id="section-7" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            7
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Google Sign-In and Firebase
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Authentication is optional. For users who choose to create an account or synchronize their data, the app uses:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300 mb-4">
            <li><strong>Firebase Authentication</strong> (managed by Google LLC).</li>
            <li><strong>Firebase Cloud Firestore</strong> (managed by Google LLC).</li>
            <li><strong>Google Play Services Authentication</strong> (Android framework).</li>
          </ul>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 mb-4">
            <h3 className={`font-bold text-xs uppercase tracking-wider ${headingClasses}`}>
              Data Processed When Users Sign In:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Firebase User ID (UID).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Email address.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Display name.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Avatar / profile information.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Aggregate daily reel counts.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7C3AED]">•</span> Historical daily totals.
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-300">
            <strong>Purpose:</strong> These details are used for authentication, account management, cloud synchronization, and implemented social features (such as multiplayer Battle Mode and community leaderboards). Firebase infrastructure receives relevant data when these features are used.
          </p>
        </div>
      </section>

      {/* SECTION 8: HOW WE USE INFORMATION */}
      <section id="section-8" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            8
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            How We Use Information
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter uses the information described above strictly for the following operational purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs text-slate-300 mb-4">
            <li><strong>Reel Counting & Tracking:</strong> Monitoring scroll events in supported apps (Instagram, YouTube Shorts, Facebook Reels, Snapchat Spotlight) to calculate your reel count.</li>
            <li><strong>Wellbeing Metrics & Limits:</strong> Displaying daily tallies, comparing counts against daily goals, and showing the floating overlay counter.</li>
            <li><strong>Cloud Synchronization:</strong> Associating aggregate counts with your Firebase UID so your statistics persist across device switches (for signed-in users).</li>
            <li><strong>Social & Competitive Features:</strong> Enabling Battle Mode matchups and displaying public gamer tags and scores on leaderboards (for signed-in users).</li>
            <li><strong>Preferences:</strong> Remembering your floating overlay position and visual display preferences.</li>
          </ul>

          <div className="p-4 rounded-2xl bg-[#1E1B2E] border border-[#3B3456] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">
              We do not sell or rent users' personal information. We do not use your information for advertising profiling or commercial data resale.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 9: THIRD-PARTY SERVICES AND DATA SHARING */}
      <section id="section-9" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            9
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Third-Party Services and Data Sharing
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter integrates with specific third-party infrastructure providers to support authentication and cloud storage:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300 mb-4">
            <li>
              <strong>Google Play Services:</strong> Used on Android for Google Sign-In authentication.
            </li>
            <li>
              <strong>Firebase Authentication & Cloud Firestore (Google LLC):</strong> Cloud infrastructure used to authenticate users and store synchronized statistics.
            </li>
          </ul>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 mb-4">
            <h3 className={`font-bold text-xs uppercase tracking-wider ${headingClasses}`}>
              Data Sharing Disclosures
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google/Firebase services process information required for authentication and cloud synchronization in accordance with the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-purple-300 hover:underline inline-flex items-center gap-1">Google Privacy Policy <ExternalLink className="w-3 h-3" /></a>.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              We do not sell or rent personal information. While we do not share data with commercial advertisers, we do not make an absolute claim that information is never shared with third parties: data is processed by Google/Firebase infrastructure as necessary to operate account features, and information may be disclosed if strictly required to comply with applicable laws, court orders, or enforceable governmental requests.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            <strong>Absence of Third-Party Ad Networks:</strong> The static codebase audit did not identify AdMob, advertising SDKs, Firebase Analytics, or Crashlytics in the inspected project.
          </p>
        </div>
      </section>

      {/* SECTION 10: DATA SECURITY */}
      <section id="section-10" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            10
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Security
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter applies standard technical safeguards appropriate to its functionality:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300 mb-4">
            <li><strong>Encrypted Transmission:</strong> Communications between Reel Counter and Firebase services use HTTPS / TLS encryption in transit.</li>
            <li><strong>Operating System Sandboxing:</strong> Local metrics are stored within Android's application-private storage, isolated from unauthorized access by other apps on your device.</li>
          </ul>

          <div className="p-4 rounded-2xl border border-[#3B3456] bg-[#262238] text-xs text-slate-300 space-y-2">
            <strong className="text-white block">Accurate Security Limitations:</strong>
            <p>
              We provide no unsupported guarantees regarding Firestore Security Rules or encryption at rest. While standard security measures are utilized, no method of transmission over the internet or method of electronic storage is 100% secure. Absolute security cannot be guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 11: DATA RETENTION */}
      <section id="section-11" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            11
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Retention
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Data retention is divided into local storage and cloud synchronization:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-2">
              <h3 className={`font-bold text-xs uppercase tracking-wider ${headingClasses}`}>Local Data (Guest Mode)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retained on your device until you reset data in the app, clear application storage in Android system settings, or uninstall the application.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-2">
              <h3 className={`font-bold text-xs uppercase tracking-wider ${headingClasses}`}>Cloud Data (Signed-In Accounts)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Account information and aggregate counts are retained in Firebase infrastructure while the account remains active to provide ongoing cloud synchronization and leaderboard functionality.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            We do not claim arbitrary retention periods beyond what is supported by the actual service configuration.
          </p>
        </div>
      </section>

      {/* SECTION 12: DATA DELETION AND USER CHOICES */}
      <section id="section-12" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            12
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Deletion and User Choices
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Users possess the following direct controls over their data and permissions:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300 mb-5">
            <li><strong>Revoke Accessibility Service:</strong> Disable the service at any time in <code className="font-mono text-xs text-purple-300">Android Settings &gt; Accessibility &gt; Reel Counter</code>.</li>
            <li><strong>Revoke Overlay Permission:</strong> Turn off "Display over other apps" at any time in Android settings.</li>
            <li><strong>Clear Local Data:</strong> Clear all local counts and preferences via <code className="font-mono text-xs text-purple-300">Android Settings &gt; Apps &gt; Reel Counter &gt; Storage &gt; Clear Data</code> or by uninstalling the application.</li>
            <li><strong>Sign Out:</strong> Signed-in users can disconnect their Google account in the app settings to stop further cloud synchronization on that device.</li>
          </ul>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-2">
            <h3 className={`font-bold text-sm ${headingClasses}`}>
              Account and Cloud Data Deletion
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Users can request permanent deletion of their account and all associated cloud data (profile, stats, and battle history) at any time by emailing <a href="mailto:sainiujvl@gmail.com" className="text-purple-300 font-mono hover:underline font-medium">sainiujvl@gmail.com</a> with their registered email address or User ID. All data will be permanently deleted from our servers within 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 13: CHILDREN'S PRIVACY */}
      <section id="section-13" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            13
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Children's Privacy
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            Reel Counter is designed as a digital wellbeing tool. We do not invent an age restriction or make claims regarding COPPA compliance.
          </p>

          <div className="p-5 rounded-2xl border border-[#3B3456] bg-[#262238] space-y-3 mb-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-purple-300">
              <Info className="w-4 h-4 text-[#7C3AED]" />
              <span>Audience and Age Policy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reel Counter is designed as a digital wellbeing application intended for a general audience. The application does not intentionally target children or knowingly collect personal information from individuals below the minimum legal age in their respective jurisdiction.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              If a parent or guardian becomes aware that personal details have been submitted without consent, they should contact the developer at <a href="mailto:sainiujvl@gmail.com" className="text-purple-300 font-mono hover:underline font-medium">sainiujvl@gmail.com</a>, and we will promptly verify and permanently delete any corresponding records.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 14: INTERNATIONAL DATA PROCESSING */}
      <section id="section-14" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            14
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            International Data Processing
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            If you use optional Google Sign-In and cloud synchronization, your account data is processed on Google Firebase infrastructure.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Google operates data centers and servers globally, including within the United States. If you access cloud features from outside the United States, your synchronized account data may be transferred to and processed in jurisdictions where data protection standards may differ from those in your country.
          </p>
        </div>
      </section>

      {/* SECTION 15: CHANGES TO THIS POLICY */}
      <section id="section-15" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            15
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Changes to This Policy
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-3">
            We may update this Privacy Policy from time to time to reflect modifications in application functionality, technical architecture, or legal requirements.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-300 mb-3">
            <li>Any updated version will be published at <a href="https://reelcounter.vercel.app/privacy-policy" className="text-purple-300 hover:underline">https://reelcounter.vercel.app/privacy-policy</a>.</li>
            <li>The "Last Updated" date at the top of this document will reflect the date of the most recent revision.</li>
          </ul>
          <p className="text-xs text-slate-400">
            Users are encouraged to review this policy periodically. Continued use of the application following the posting of an updated policy represents acknowledgment of those changes.
          </p>
        </div>
      </section>

      {/* SECTION 16: CONTACT US */}
      <section id="section-16" className={`${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] font-mono text-sm font-bold">
            16
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Contact Us
          </h2>
        </div>
        <div className={subtextClasses}>
          <p className="mb-4">
            For inquiries, technical questions, or privacy-related concerns regarding Reel Counter, please contact the developer:
          </p>

          <div className="p-6 rounded-3xl border border-[#3B3456] bg-[#262238] space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-base ${headingClasses}`}>Ujjaval Saini</div>
                <div className="text-xs text-slate-400">Developer &amp; Publisher of Reel Counter</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#3B3456] grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Privacy Contact Email:</span>
                <a href="mailto:sainiujvl@gmail.com" className="text-purple-300 font-mono font-bold bg-[#1E1B2E] px-2 py-0.5 rounded border border-[#3B3456] hover:underline inline-block">
                  sainiujvl@gmail.com
                </a>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Application Package:</span>
                <code className="text-purple-300 font-mono">com.uv.reelcounter</code>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Official Website:</span>
                <a href="https://reelcounter.vercel.app/" className="text-purple-300 hover:underline">
                  https://reelcounter.vercel.app/
                </a>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Permanent Policy URL:</span>
                <a href="https://reelcounter.vercel.app/privacy-policy" className="text-purple-300 hover:underline">
                  https://reelcounter.vercel.app/privacy-policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK JUMP BACK TO TOP */}
      <div className="pt-8 text-center">
        <a
          href="#toc-heading"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-purple-300 border border-[#3B3456] bg-[#262238] hover:bg-[#312B4A] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
        >
          <span>↑ Back to Table of Contents</span>
        </a>
      </div>
    </LegalLayout>
  );
}
