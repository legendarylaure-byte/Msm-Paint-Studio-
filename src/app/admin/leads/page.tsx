"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, Paintbrush, User, Clock } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  property: string;
  date: string;
  slot: string;
  details?: string;
  colour?: string;
  calculator?: any;
  source: string;
  timestamp: string;
  status: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter((l) => l.status === filter);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("en-AU");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Leads</h1>
          <p className="mt-2 text-white/70">All booking enquiries and calculator submissions</p>
        </div>

        <div className="mb-6 flex gap-2">
          {["all", "new", "contacted", "quoted", "booked", "closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === status
                  ? "bg-tangerine text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 rounded-full bg-black/30 px-2 py-0.5 text-xs">
                {status === "all" ? leads.length : leads.filter((l) => l.status === status).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-tangerine border-t-transparent" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <p className="text-white/50">No leads found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-tangerine/20">
                      <User className="h-6 w-6 text-tangerine" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                      <p className="text-sm text-white/50">ID: {lead.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      lead.status === "new" ? "bg-green-500/20 text-green-400" :
                      lead.status === "contacted" ? "bg-blue-500/20 text-blue-400" :
                      lead.status === "quoted" ? "bg-yellow-500/20 text-yellow-400" :
                      lead.status === "booked" ? "bg-purple-500/20 text-purple-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {lead.status}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      {lead.source}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 text-white/50" />
                    <div>
                      <p className="text-xs text-white/50">Email</p>
                      <p className="text-sm text-white">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 text-white/50" />
                    <div>
                      <p className="text-xs text-white/50">Phone</p>
                      <p className="text-sm text-white">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-white/50" />
                    <div>
                      <p className="text-xs text-white/50">Address</p>
                      <p className="text-sm text-white">{lead.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-white/50" />
                    <div>
                      <p className="text-xs text-white/50">Submitted</p>
                      <p className="text-sm text-white">{formatDate(lead.timestamp)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="mb-1 text-xs text-white/50">Service</p>
                    <p className="font-semibold text-white">{lead.service}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="mb-1 text-xs text-white/50">Property Type</p>
                    <p className="font-semibold text-white">{lead.property}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="mb-1 text-xs text-white/50">Preferred</p>
                    <p className="font-semibold text-white">{lead.date} • {lead.slot}</p>
                  </div>
                </div>

                {lead.colour && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 p-3">
                    <Paintbrush className="h-4 w-4 text-white/50" />
                    <span className="text-sm text-white/70">Selected Colour:</span>
                    <span className="font-semibold text-white">{lead.colour}</span>
                  </div>
                )}

                {lead.details && (
                  <div className="mt-4 rounded-xl bg-white/5 p-3">
                    <p className="mb-1 text-xs text-white/50">Details</p>
                    <p className="text-sm text-white/90">{lead.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
