"use client";

import { Dialog } from "radix-ui";
import { Mail, MessageCircle, Phone, X, type LucideIcon } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import type { Dictionary } from "@/data/dictionaries/types";

export function ContactDialog({ dict }: { dict: Dictionary }) {
  const { contact } = dict;

  const channels: { label: string; value: string; href: string; icon: LucideIcon; external?: boolean }[] = [
    { label: contact.phoneLabel, value: CONTACT.phone, href: CONTACT.phoneHref, icon: Phone },
    { label: contact.whatsappLabel, value: CONTACT.phone, href: CONTACT.whatsappUrl, icon: MessageCircle, external: true },
    { label: contact.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail }
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-brand-amber/60 hover:text-brand-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber">
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
