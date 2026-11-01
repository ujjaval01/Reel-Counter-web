import React from 'react';
import { useTheme } from '../ThemeContext';
import LegalLayout from '../components/LegalLayout';
import { 
  ShieldCheck, Smartphone, Database, Lock, EyeOff, AlertTriangle, 
  CheckCircle2, Info, Mail, Globe, Cloud, Sparkles, UserX, FileText,
  Layers, ExternalLink, HelpCircle
} from 'lucide-react';

const SECTIONS = [
  { id: 'section-1', number: '1', title: 'Introduction' },
  { id: 'section-2', number: '2', title: 'Information About the Developer' },
  { id: 'section-3', number: '3', title: 'Scope of This Policy' },
  { id: 'section-4', number: '4', title: 'How Reel Counter Works' },
  { id: 'section-5', number: '5', title: 'Information Processed by the App' },
  { id: 'section-6', number: '6', title: 'Accessibility Service and On-Device Processing' },
  { id: 'section-7', number: '7', title: 'Local Storage' },
  { id: 'section-8', number: '8', title: 'Google Sign-In and Account Information' },
  { id: 'section-9', number: '9', title: 'Firebase Authentication and Firestore' },
  { id: 'section-10', number: '10', title: 'How Information Is Used' },
  { id: 'section-11', number: '11', title: 'Data Sharing and Third-Party Services' },
  { id: 'section-12', number: '12', title: 'Data Retention' },
  { id: 'section-13', number: '13', title: 'Data Deletion and User Choices' },
  { id: 'section-14', number: '14', title: 'Data Security' },
  { id: 'section-15', number: '15', title: 'Children\'s Privacy' },
  { id: 'section-16', number: '16', title: 'International Data Processing' },
  { id: 'section-17', number: '17', title: 'Changes to This Policy' },
  { id: 'section-18', number: '18', title: 'Contact Information' },
];

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardClasses = isDark
    ? 'bg-[#12172A] border-slate-800 text-slate-300'
    : 'bg-white border-slate-200 text-slate-700 shadow-sm';

  const calloutInfoClasses = isDark
    ? 'bg-blue-950/30 border-blue-800/60 text-blue-200'
    : 'bg-blue-50 border-blue-200 text-blue-900';

  const calloutWarningClasses = isDark
    ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
    : 'bg-amber-50 border-amber-200 text-amber-900';

  const calloutSuccessClasses = isDark
    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
    : 'bg-emerald-50 border-emerald-200 text-emerald-900';

  const headingClasses = isDark ? 'text-white' : 'text-slate-900';
  const subtextClasses = isDark ? 'text-slate-400' : 'text-slate-600';
  const dividerClasses = isDark ? 'border-slate-800/80' : 'border-slate-200';

  return (
    <LegalLayout
      title="Privacy Policy"
      description="Official Privacy Policy for Reel Counter (com.uv.reelcounter) by Ujjaval Saini. Transparent disclosures covering our on-device Accessibility Service processing, local storage, guest mode, and optional Google Sign-In with Firebase."
      lastUpdated="November 2026"
      badge="Verified App Policy"
    >
      {/* 4 HIGHLIGHT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border ${cardClasses} flex flex-col justify-between`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>On-Device Detection</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Scroll events and UI node metadata are inspected in-memory on your device to count reels. No screen text or media is captured.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${cardClasses} flex flex-col justify-between`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <UserX className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>Guest Mode by Default</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Track reels without creating an account or logging in. All counting metrics and preferences are stored strictly on your device.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${cardClasses} flex flex-col justify-between`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>Optional Cloud Sync</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Google Sign-In and Firebase are only utilized if you choose to sync your totals, join Battle Mode, or appear on leaderboards.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${cardClasses} flex flex-col justify-between`}>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-sm ${headingClasses}`}>No Ad Trackers</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              The static codebase audit confirmed the absence of AdMob, advertising SDKs, Firebase Analytics, or Crashlytics trackers.
            </p>
          </div>
        </div>
      </div>

      {/* TABLE OF CONTENTS CARD */}
      <section aria-labelledby="toc-heading" className={`p-6 sm:p-8 rounded-3xl border ${cardClasses}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
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
              className="flex items-baseline gap-2.5 py-1 text-slate-400 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 -mx-1"
            >
              <span className="font-mono text-purple-400 font-bold w-5 shrink-0">{sec.number}.</span>
              <span className="truncate">{sec.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 1: INTRODUCTION */}
      <section id="section-1" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            1
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Introduction
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Welcome to <strong>Reel Counter</strong>. Reel Counter is an Android digital wellbeing and screen-time awareness application designed to help individuals monitor, quantify, and regulate their consumption of short-form video content across supported mobile applications, including Instagram Reels, YouTube Shorts, and Facebook Reels.
          </p>
          <p>
            We believe that digital self-improvement utilities should respect and protect individual privacy. Reel Counter is engineered around a <strong>privacy-first, local-first architecture</strong>: you can use all primary tracking features completely on your device without creating an account or supplying personal contact details.
          </p>
          <p>
            This Privacy Policy describes in full transparency what information is accessed, how it is processed, where it is stored, and what rights and choices you possess when you use the Reel Counter Android application and our informational website.
          </p>
        </div>
      </section>

      {/* SECTION 2: INFORMATION ABOUT THE DEVELOPER */}
      <section id="section-2" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            2
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Information About the Developer
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Reel Counter is published and maintained by independent developer <strong>Ujjaval Saini</strong>.
          </p>
          <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Application Name:</span>
                <strong className={headingClasses}>Reel Counter</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Android Package Name:</span>
                <code className="text-purple-400 font-mono">com.uv.reelcounter</code>
              </div>
              <div>
                <span className="text-slate-400 block">Publisher / Developer:</span>
                <strong className={headingClasses}>Ujjaval Saini</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Official Website & Policy:</span>
                <a
                  href="https://reelcounter.vercel.app/privacy-policy"
                  className="text-purple-400 hover:underline break-all"
                >
                  https://reelcounter.vercel.app/privacy-policy
                </a>
              </div>
            </div>
          </div>
          <p>
            For privacy-related inquiries, data requests, or policy questions, please consult Section 18 for our official contact details.
          </p>
        </div>
      </section>

      {/* SECTION 3: SCOPE OF THIS POLICY */}
      <section id="section-3" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            3
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Scope of This Policy
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            This Privacy Policy applies solely to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>The <strong>Reel Counter</strong> Android mobile application (<code className="font-mono text-xs">com.uv.reelcounter</code>).</li>
            <li>The accompanying web interface and documentation hosted at <code className="font-mono text-xs">https://reelcounter.vercel.app</code>.</li>
            <li>Direct communications and customer support interactions between you and the developer.</li>
          </ul>
          <div className={`p-4 rounded-2xl border ${calloutInfoClasses} flex items-start gap-3`}>
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed space-y-1">
              <strong className="block font-semibold">Third-Party Platforms Disclaimer</strong>
              Reel Counter is an independent utility that assists users in monitoring short-video scrolling. It is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc. (Instagram, Facebook) or Google LLC / Alphabet Inc. (YouTube). When you interact with third-party social media applications on your device, their respective Terms of Service and Privacy Policies govern the collection and use of your data by those companies.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW REEL COUNTER WORKS */}
      <section id="section-4" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            4
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            How Reel Counter Works
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Reel Counter helps users become mindful of repetitive video scrolling through real-time detection, daily count meters, streak tracking, and interactive challenges. The app functions through two modes:
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className={`p-5 rounded-2xl border ${cardClasses} space-y-2`}>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mode 1: Guest Mode (Default)
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                You can immediately use Reel Counter without registering or logging in. The app counts short videos locally, tracks daily targets, and displays your statistics without sending any data to external servers.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${cardClasses} space-y-2`}>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold">
                <Cloud className="w-3.5 h-3.5" />
                Mode 2: Synchronized Mode (Optional)
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                If you choose to sign in using Google Sign-In, Reel Counter securely synchronizes your aggregate scroll totals via Firebase so that you can switch devices, compete in 1v1 Battle Mode, and participate in community leaderboards.
              </p>
            </div>
          </div>
          <p>
            To detect scrolling activity in supported third-party apps, Reel Counter relies on an <strong>Android Accessibility Service</strong>, which must be explicitly enabled by the user in Android system settings.
          </p>
        </div>
      </section>

      {/* SECTION 5: INFORMATION PROCESSED BY THE APP */}
      <section id="section-5" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            5
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Information Processed by the App
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            The table below outlines every category of information processed by Reel Counter, indicating where it is handled and whether it is stored:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className={isDark ? 'bg-slate-900/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                <tr>
                  <th className="p-3 font-bold border-b border-slate-800">Data Category</th>
                  <th className="p-3 font-bold border-b border-slate-800">Specific Items</th>
                  <th className="p-3 font-bold border-b border-slate-800">Where Handled</th>
                  <th className="p-3 font-bold border-b border-slate-800">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3 font-semibold text-purple-400">UI Node Metadata & Scroll Events</td>
                  <td className="p-3">Container view identifiers, layout nodes, scroll direction events</td>
                  <td className="p-3">Ephemeral in-memory RAM (never saved or transmitted)</td>
                  <td className="p-3">Detecting reel transitions across supported apps</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-400">Local Usage Metrics</td>
                  <td className="p-3">Daily counts, platform breakdown (IG, YT, FB), streak tallies, daily limits</td>
                  <td className="p-3">Local Android storage (SharedPreferences / SQLite)</td>
                  <td className="p-3">Displaying wellbeing charts and limit enforcement</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-400">Interface Settings</td>
                  <td className="p-3">Theme preference (dark/light), notifications toggle</td>
                  <td className="p-3">Local Android storage</td>
                  <td className="p-3">User experience consistency</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-400">Account Identity (Optional)</td>
                  <td className="p-3">Firebase UID, email address, display name, avatar URL</td>
                  <td className="p-3">Firebase Authentication & Cloud Firestore</td>
                  <td className="p-3">User login, cloud synchronization, leaderboard identification</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-400">Synchronized Totals (Optional)</td>
                  <td className="p-3">Aggregate daily counts, historical totals, Battle Mode status</td>
                  <td className="p-3">Firebase Cloud Firestore</td>
                  <td className="p-3">Multi-device sync, friend battles, leaderboard ranking</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`p-4 rounded-2xl border ${calloutSuccessClasses} space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4" />
              <span>Audit Finding: Data Not Collected</span>
            </div>
            <p className="text-xs leading-relaxed">
              A comprehensive static codebase audit confirmed that Reel Counter does <strong>NOT</strong> collect, request, record, or transmit:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 pl-2">
              <li>Precise or coarse GPS / network location</li>
              <li>Contacts, phone books, or call logs</li>
              <li>Camera video, microphone audio recordings, or photo library files</li>
              <li>Google Advertising ID (AAID) for ad targeting or behavioural profiling</li>
              <li>Screen text, captions, comments, or private messages from monitored feeds</li>
              <li>Account passwords or login credentials for third-party social media accounts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: ACCESSIBILITY SERVICE AND ON-DEVICE PROCESSING */}
      <section id="section-6" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            6
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Accessibility Service and On-Device Processing
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Android enforces strict sandbox boundaries between applications. To count short-form videos without requiring invasive root permissions or proprietary platform APIs, Reel Counter requests the user to grant permission for an <strong>Android Accessibility Service</strong> (<code className="text-xs font-mono">AccessibilityService</code>).
          </p>

          <div className={`p-5 rounded-2xl border ${cardClasses} space-y-3`}>
            <h3 className={`font-bold text-sm ${headingClasses}`}>Accurate Description of Service Operation</h3>
            <p className="text-xs leading-relaxed">
              When enabled, the Accessibility Service receives system accessibility events (such as scroll gestures and window state changes). The service inspects relevant <strong>UI node metadata</strong> (such as container identifiers, view hierarchy structure, and package names) strictly to:
            </p>
            <ol className="list-decimal list-inside text-xs space-y-1.5 pl-2">
              <li>Identify when a supported short-form video feed (e.g., Instagram Reels, YouTube Shorts, or Facebook Reels) is in the foreground.</li>
              <li>Detect when a vertical scroll gesture has transitioned to the next video item.</li>
              <li>Increment your local reel counter and compare against your active daily limit.</li>
            </ol>
          </div>

          <div className={`p-4 rounded-2xl border ${calloutInfoClasses} space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict On-Device Privacy Safeguards</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1.5 pl-2">
              <li>
                <strong>Ephemeral in-memory analysis only:</strong> All inspection of UI node metadata occurs purely in volatile device RAM. Metadata is discarded immediately after scroll evaluation.
              </li>
              <li>
                <strong>No content recording:</strong> The app does <strong>not</strong> record, transcribe, capture, or transmit screen text, captions, user comments, private direct messages, video frames, or audio streams.
              </li>
              <li>
                <strong>No keystroke logging:</strong> The service does not inspect or monitor text input fields, virtual keyboard entries, passwords, credit cards, or personal messages.
              </li>
              <li>
                <strong>No social credentials:</strong> Reel Counter never accesses, asks for, or stores passwords or authentication tokens for your Instagram, YouTube, or Facebook accounts.
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-400">
            <strong>Revocability:</strong> The Accessibility Service permission cannot be activated silently or automatically. It requires explicit user approval in Android System Settings. You can revoke this permission at any time by navigating to <code className="font-mono text-purple-400">Android Settings &gt; Accessibility &gt; Reel Counter</code> and toggling the service off.
          </p>
        </div>
      </section>

      {/* SECTION 7: LOCAL STORAGE */}
      <section id="section-7" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            7
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Local Storage
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            When using Reel Counter in <strong>Guest Mode</strong>, all application data is stored solely on your Android device using standard operating system storage mechanisms, including Android <code className="font-mono text-xs">SharedPreferences</code> and local application-private SQLite/Room databases.
          </p>
          <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
            <h3 className={`font-bold text-xs ${headingClasses}`}>Locally Stored Data Elements:</h3>
            <ul className="list-disc list-inside text-xs space-y-1 pl-2 text-slate-400">
              <li>Daily reel counts and historical daily totals</li>
              <li>Platform-specific breakdown statistics (Instagram, YouTube, Facebook)</li>
              <li>Active daily target limits and streak calculations</li>
              <li>App configuration preferences (such as Dark/Light theme selection)</li>
            </ul>
          </div>
          <p>
            <strong>Security &amp; Sandboxing:</strong> Local data is shielded by the standard Android application sandbox, which prevents other third-party applications installed on your phone from reading Reel Counter's private directory. We accurately note that data in local storage is protected by operating-system sandboxing; we do not make unsupported claims that every local value is independently encrypted.
          </p>
          <p>
            <strong>Retention &amp; Removal:</strong> Local data persists on your device until you choose to reset your statistics inside the app, clear application data via <code className="font-mono text-xs">Android Settings &gt; Apps &gt; Reel Counter &gt; Storage &gt; Clear Data</code>, or uninstall the application.
          </p>
        </div>
      </section>

      {/* SECTION 8: GOOGLE SIGN-IN AND ACCOUNT INFORMATION */}
      <section id="section-8" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            8
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Google Sign-In and Account Information
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Creating an account or signing in is entirely optional. Users who choose to authenticate may do so via Google Sign-In, integrated through Google Play Services and Firebase Authentication.
          </p>
          <p>
            When you sign in with your Google account, the app receives standard identity tokens provided by Google's OAuth protocol:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li><strong>Firebase User ID (UID):</strong> A unique, pseudonymous identifier assigned to your account.</li>
            <li><strong>Email Address:</strong> Used for account identity verification and communication if needed.</li>
            <li><strong>Display Name:</strong> Shown on your profile, in 1v1 Battle Mode, and on community leaderboards.</li>
            <li><strong>Profile Avatar URL:</strong> Used to display your Google profile avatar image within the application interface.</li>
          </ul>
          <p>
            We do not receive or store your Google account password. Google handles the authentication flow securely on its own systems.
          </p>
        </div>
      </section>

      {/* SECTION 9: FIREBASE AUTHENTICATION AND FIRESTORE */}
      <section id="section-9" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            9
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Firebase Authentication and Firestore
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            For users who enable cloud synchronization, backend cloud infrastructure is provided by <strong>Google Firebase</strong> (a cloud service platform provided by Google LLC):
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
              <div className="font-bold text-xs text-purple-400">Firebase Authentication</div>
              <p className="text-xs leading-relaxed text-slate-400">
                Verifies user identity, issues secure authentication tokens, and maintains login sessions across application restarts.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
              <div className="font-bold text-xs text-purple-400">Firebase Cloud Firestore</div>
              <p className="text-xs leading-relaxed text-slate-400">
                A secure NoSQL cloud database used to store user profiles, aggregate daily counts, total historical counts, active Battle Mode states, and community leaderboard standings.
              </p>
            </div>
          </div>
          <p>
            All network communication between Reel Counter and Firebase services is encrypted in transit using industry-standard <strong>Transport Layer Security (TLS/HTTPS)</strong>. Google/Firebase infrastructure processes relevant information in accordance with Google's robust cloud security and the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline inline-flex items-center gap-1">Google Privacy Policy <ExternalLink className="w-3 h-3" /></a>.
          </p>
        </div>
      </section>

      {/* SECTION 10: HOW INFORMATION IS USED */}
      <section id="section-10" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            10
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            How Information Is Used
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Information processed by Reel Counter is used solely to provide and improve your digital wellbeing experience. Specifically, we use information for:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs">
            <li><strong>Core Counting &amp; Analytics:</strong> Calculating daily reel counts, tracking weekly averages, and rendering wellbeing progress charts.</li>
            <li><strong>Limit Enforcement &amp; Alerts:</strong> Evaluating active consumption against your configured daily target and displaying in-app warnings or system notifications when limits are reached.</li>
            <li><strong>Multi-Device Synchronization:</strong> Linking your aggregate statistics to your Firebase UID so your progress is preserved if you change phones (signed-in users only).</li>
            <li><strong>Social Battle Mode &amp; Leaderboards:</strong> Allowing authenticated players to challenge friends, compare scroll totals, and display rank in regional or global leaderboards.</li>
            <li><strong>Interface Persistence:</strong> Remembering your theme mode (dark or light) and display preferences.</li>
            <li><strong>App Integrity:</strong> Ensuring legitimate functionality and diagnosing critical app errors.</li>
          </ul>
          <div className={`p-4 rounded-2xl border ${calloutSuccessClasses} flex items-center gap-3`}>
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span className="text-xs font-semibold">
              We do <strong>not</strong> sell, rent, monetize, or broker personal data. We do not use your information for targeted advertising or commercial profiling.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 11: DATA SHARING AND THIRD-PARTY SERVICES */}
      <section id="section-11" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            11
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Sharing and Third-Party Services
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Reel Counter limits third-party integrations to essential platform and infrastructure providers:
          </p>

          <div className={`p-4 rounded-2xl border ${cardClasses} space-y-3`}>
            <h3 className={`font-bold text-xs ${headingClasses}`}>Identified Third-Party Infrastructure:</h3>
            <ul className="list-disc list-inside text-xs space-y-1.5 pl-2 text-slate-400">
              <li>
                <strong>Google Play Services:</strong> Powers core Android framework interactions and Google Sign-In authentication.
              </li>
              <li>
                <strong>Firebase Authentication (Google LLC):</strong> Facilitates secure user account verification.
              </li>
              <li>
                <strong>Firebase Cloud Firestore (Google LLC):</strong> Cloud storage provider for user profiles and synchronized game statistics.
              </li>
            </ul>
          </div>

          <div className={`p-4 rounded-2xl border ${calloutInfoClasses} space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <Info className="w-4 h-4" />
              <span>Static Codebase Audit Verification</span>
            </div>
            <p className="text-xs leading-relaxed">
              The static codebase audit verified that Reel Counter does <strong>not</strong> include:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 pl-2">
              <li>Google AdMob, Unity Ads, AppLovin, or any advertising SDKs</li>
              <li>Firebase Analytics, Google Analytics, or third-party usage telemetries</li>
              <li>Firebase Crashlytics or third-party automated crash reporters</li>
              <li>Social media trackers, marketing pixels, or attribution SDKs</li>
            </ul>
          </div>

          <p>
            We do not share your information with any other third parties, except in narrow circumstances where required to comply with applicable laws, judicial proceedings, or enforceable governmental requests.
          </p>
        </div>
      </section>

      {/* SECTION 12: DATA RETENTION */}
      <section id="section-12" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            12
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Retention
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            We adhere to data minimization principles and distinguish between locally stored data and cloud-synchronized data:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
              <h3 className={`font-bold text-xs ${headingClasses}`}>Local Data (Guest Mode)</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Metrics and settings stored locally on your device persist until you clear application storage, reset data via in-app settings, or uninstall Reel Counter. We do not enforce automatic expiration of your local historical metrics.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-2`}>
              <h3 className={`font-bold text-xs ${headingClasses}`}>Cloud Data (Signed-In Accounts)</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Synchronized profile information and aggregate counts stored in Firebase Firestore are maintained for the active lifecycle of your account to ensure continuity of your battle stats and rankings. Cloud data remains until an account deletion is requested.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            We do not fabricate arbitrary retention windows. If your account remains inactive for extended periods, cloud records may be subject to periodic maintenance or cleanup in accordance with applicable service terms.
          </p>
        </div>
      </section>

      {/* SECTION 13: DATA DELETION AND USER CHOICES */}
      <section id="section-13" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            13
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Deletion and User Choices
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            You have full control over the information you share and store with Reel Counter:
          </p>
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-1.5`}>
              <div className="font-bold text-xs text-purple-400">1. Disabling the Accessibility Service</div>
              <p className="text-xs leading-relaxed text-slate-400">
                You can immediately halt reel detection at any time by toggling off Reel Counter in <code className="font-mono text-xs">Android Settings &gt; Accessibility</code>. Revoking accessibility permissions does not erase your historical counts.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-1.5`}>
              <div className="font-bold text-xs text-purple-400">2. Deleting Local Device Data</div>
              <p className="text-xs leading-relaxed text-slate-400">
                To wipe all local counts, preferences, and cached statistics, open <code className="font-mono text-xs">Android Settings &gt; Apps &gt; Reel Counter &gt; Storage &gt; Clear Data</code> or uninstall the app.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClasses} space-y-1.5`}>
              <div className="font-bold text-xs text-purple-400">3. Signing Out of Your Account</div>
              <p className="text-xs leading-relaxed text-slate-400">
                Signed-in users can disconnect their Google account at any time via the in-app profile menu. Signing out stops cloud synchronization on that device.
              </p>
            </div>
          </div>

          {/* DEVELOPER VERIFICATION CALLOUT FOR ACCOUNT DELETION */}
          <div className={`p-5 rounded-2xl border ${calloutWarningClasses} space-y-3`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Account &amp; Cloud Data Deletion Notice</span>
            </div>
            <p className="text-xs leading-relaxed">
              The Android app audit identified a dedicated in-app <strong>Delete Account flow</strong> as a required implementation or verification item under Google Play's Data Safety and Account Deletion policy.
            </p>
            <div className="text-xs leading-relaxed space-y-2">
              <p>
                <strong>How to Request Deletion:</strong> If you have created a cloud account and wish to permanently delete your account, authentication record, synchronized counts, and battle history from Firebase, please email developer Ujjaval Saini at <code className="font-mono bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300">[CONTACT_EMAIL_PLACEHOLDER]</code> with the subject line <em>"Account Deletion Request - Reel Counter"</em> from your registered Google email address.
              </p>
              <p>
                Verified deletion requests are permanently purged from Firebase Authentication and Cloud Firestore within 30 days. An automated in-app deletion button will also be made available directly within application settings upon final verification of the in-app deletion flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: DATA SECURITY */}
      <section id="section-14" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            14
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Data Security
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            We implement reasonable technical and organizational measures to safeguard user data:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li><strong>Encrypted Communications:</strong> All network requests to Firebase servers are transmitted using modern Transport Layer Security (TLS 1.2 and TLS 1.3/HTTPS).</li>
            <li><strong>Database Security Rules:</strong> Cloud Firestore security rules ensure that authenticated users can only write to their own account documents.</li>
            <li><strong>Operating System Isolation:</strong> Local application files are isolated inside Android's protected application sandbox.</li>
            <li><strong>No Credential Storage:</strong> We never handle or store passwords for your Google account or monitored social media platforms.</li>
          </ul>
          <p className="text-xs text-slate-400">
            <strong>Realistic Disclaimer:</strong> While we employ industry-standard security safeguards, no method of electronic storage or transmission over the internet is completely impenetrable. Consequently, we cannot guarantee absolute or infallible security against all potential threats.
          </p>
        </div>
      </section>

      {/* SECTION 15: CHILDREN'S PRIVACY */}
      <section id="section-15" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            15
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Children's Privacy
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Reel Counter is designed as a digital wellbeing tool for a general audience. The application does not intentionally market to, solicit information from, or knowingly collect personal information from children.
          </p>
          
          {/* DEVELOPER VERIFICATION ITEM */}
          <div className={`p-4 rounded-2xl border ${calloutWarningClasses} space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Developer Verification Item: Target Audience Declaration</span>
            </div>
            <p className="text-xs leading-relaxed">
              In accordance with Google Play's Families Policy, the developer must verify and declare the target age group in Google Play Console (e.g., 13+, 16+, or 18+). The app does not knowingly collect personal data from children under 13 (or the minimum legal age in your jurisdiction).
            </p>
          </div>

          <p>
            If a parent or legal guardian discovers that their child has registered an account or provided personal details without parental consent, please contact developer Ujjaval Saini at <code className="font-mono bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300">[CONTACT_EMAIL_PLACEHOLDER]</code>. We will verify and permanently delete the corresponding account records promptly.
          </p>
        </div>
      </section>

      {/* SECTION 16: INTERNATIONAL DATA PROCESSING */}
      <section id="section-16" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            16
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            International Data Processing
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            Reel Counter's optional cloud features operate on Google Cloud and Firebase infrastructure. Google maintains data centers distributed globally, predominantly in the United States and other regions.
          </p>
          <p>
            If you access Reel Counter from outside the United States (for example, from the European Economic Area, the United Kingdom, Canada, or India), your synchronized account data may be transferred to and processed in jurisdictions whose data protection laws may differ from those in your country. Google relies on standard contractual clauses (SCCs) and robust organizational measures for international data transfers.
          </p>
        </div>
      </section>

      {/* SECTION 17: CHANGES TO THIS POLICY */}
      <section id="section-17" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            17
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Changes to This Policy
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            We may revise this Privacy Policy periodically to reflect app updates, new feature releases, changes in legal obligations, or improvements to our infrastructure.
          </p>
          <p>
            When changes are posted:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li>The updated version will be published at <a href="https://reelcounter.vercel.app/privacy-policy" className="text-purple-400 hover:underline">https://reelcounter.vercel.app/privacy-policy</a>.</li>
            <li>The <strong>"Effective Date / Last Updated"</strong> date at the top of the policy will be updated.</li>
            <li>For material modifications that alter data handling practices, we will provide noticeable in-app notice where feasible.</li>
          </ul>
          <p>
            Your continued use of Reel Counter following the posting of an updated policy signifies your acknowledgment and acceptance of the revised terms.
          </p>
        </div>
      </section>

      {/* SECTION 18: CONTACT INFORMATION */}
      <section id="section-18" className={`pt-8 border-t ${dividerClasses} scroll-mt-28 space-y-4`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 font-mono text-sm font-bold">
            18
          </span>
          <h2 className={`text-2xl font-bold tracking-tight ${headingClasses}`}>
            Contact Information
          </h2>
        </div>
        <div className={`space-y-4 text-sm leading-relaxed ${subtextClasses}`}>
          <p>
            If you have questions, feedback, or requests regarding this Privacy Policy or your data, please contact the developer:
          </p>

          <div className={`p-6 rounded-3xl border ${cardClasses} space-y-3`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-base ${headingClasses}`}>Ujjaval Saini</div>
                <div className="text-xs text-slate-400">Developer &amp; Publisher of Reel Counter</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Privacy &amp; Data Contact:</span>
                <code className="text-purple-400 font-mono font-bold">[CONTACT_EMAIL_PLACEHOLDER]</code>
              </div>
              <div>
                <span className="text-slate-400 block">Application Package:</span>
                <code className="text-purple-400 font-mono">com.uv.reelcounter</code>
              </div>
              <div>
                <span className="text-slate-400 block">Official Website:</span>
                <a href="https://reelcounter.vercel.app/" className="text-purple-400 hover:underline">
                  https://reelcounter.vercel.app/
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">Policy Permanent URL:</span>
                <a href="https://reelcounter.vercel.app/privacy-policy" className="text-purple-400 hover:underline">
                  https://reelcounter.vercel.app/privacy-policy
                </a>
              </div>
            </div>
          </div>

          {/* DEVELOPER VERIFICATION SUMMARY TABLE */}
          <div className={`p-5 rounded-3xl border ${calloutWarningClasses} space-y-3 mt-6`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Developer Pre-Publication Action Items</span>
            </div>
            <p className="text-xs leading-relaxed">
              Before submitting Reel Counter to the Google Play Store or publishing this policy in production, the developer must resolve the following verified checklist items:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-amber-800/40 font-bold">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Description</th>
                    <th className="py-2">Required Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-800/20">
                  <tr>
                    <td className="py-2 pr-3 font-semibold">1. Contact Email</td>
                    <td className="py-2 pr-3">Currently using placeholder <code className="font-mono">[CONTACT_EMAIL_PLACEHOLDER]</code></td>
                    <td className="py-2 font-medium">Replace with official contact email (e.g. <code className="font-mono">sainiujvl@gmail.com</code>)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">2. Account Deletion</td>
                    <td className="py-2 pr-3">In-app Delete Account flow flagged by static audit</td>
                    <td className="py-2 font-medium">Verify or implement the in-app deletion button in Android app settings before Play submission</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">3. Children's Age Policy</td>
                    <td className="py-2 pr-3">Target audience declaration in Google Play Console</td>
                    <td className="py-2 font-medium">Confirm target age group (e.g. 13+) in Play Console Families Policy declaration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK JUMP BACK TO TOP */}
      <div className="pt-8 text-center">
        <a
          href="#toc-heading"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span>↑ Back to Table of Contents</span>
        </a>
      </div>
    </LegalLayout>
  );
}

