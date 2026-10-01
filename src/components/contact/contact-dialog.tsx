"use client";

import { Dialog } from "radix-ui";
import type { ComponentType } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import type { Dictionary } from "@/data/dictionaries/types";

type IconProps = { className?: string; "aria-hidden"?: boolean };

// lucide-react v1 dropped brand icons, so the LinkedIn mark is inlined.
function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const DEFAULT_TRIGGER_CLASS =
  "rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-brand-amber/60 hover:text-brand-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber";

export function ContactDialog({ dict, triggerClassName = DEFAULT_TRIGGER_CLASS }: { dict: Dictionary; triggerClassName?: string }) {
  const { contact } = dict;

  const channels: { label: string; value: string; href: string; icon: ComponentType<IconProps>; external?: boolean }[] = [
    { label: contact.phoneLabel, value: CONTACT.phone, href: CONTACT.phoneHref, icon: Phone },
    { label: contact.whatsappLabel, value: CONTACT.phone, href: CONTACT.whatsappUrl, icon: MessageCircle, external: true },
    { label: contact.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
    { label: contact.linkedinLabel, value: CONTACT.linkedinHandle, href: CONTACT.linkedinUrl, icon: LinkedinIcon, external: true }
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger className={triggerClassName}>
        {contact.trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-near-black p-6 shadow-2xl shadow-brand-amber/10 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none sm:p-8">
          <Dialog.Title className="text-2xl font-semibold text-white">{contact.title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-white/70">{contact.description}</Dialog.Description>

          <ul className="mt-6 space-y-3">
            {channels.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-amber/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
                >
                  <Icon aria-hidden className="h-5 w-5 shrink-0 text-brand-amber" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-white/50">{label}</span>
                    <span className="block break-all text-base font-medium text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <Dialog.Close
            aria-label={contact.closeLabel}
            className="absolute right-4 top-4 rounded-md p-1 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
          >
            <X aria-hidden className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
