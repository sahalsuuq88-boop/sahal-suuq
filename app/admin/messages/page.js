
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Mail,
  MessageSquare,
  Trash2,
  Eye,
  X,
  RefreshCw,
  Clock,
  CheckCircle2,
  Reply,
  Inbox,
} from "lucide-react";

import contactService from "../../services/contect";

const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-amber-100 text-amber-700",
  replied: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await contactService.getAll();

      setMessages(response.contacts || []);
    } catch (err) {
      console.error("Messages error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load messages. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const stats = useMemo(() => ({
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
  }), [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const fullName =
        `${message.firstName} ${message.lastName}`.toLowerCase();

      const searchMatch =
        fullName.includes(search.toLowerCase()) ||
        message.email?.toLowerCase().includes(search.toLowerCase()) ||
        message.message?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        filter === "all" || message.status === filter;

      return searchMatch && statusMatch;
    });
  }, [messages, search, filter]);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdating(true);

      const response = await contactService.updateStatus(id, status);

      setMessages((prev) =>
        prev.map((item) =>
          item._id === id
            ? response.contact
            : item
        )
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage(response.contact);
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to update message status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await contactService.remove(id);

      setMessages((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setSelectedMessage(null);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete message."
      );
    }
  };

  const handleView = async (message) => {
    setSelectedMessage(message);

    if (message.status === "new") {
      await handleStatusChange(message._id, "read");
    }
  };

  const handleReply = (message) => {
    const subject = encodeURIComponent("Re: SAHAL SUUQ Contact Message");

    const body = encodeURIComponent(
      `Hello ${message.firstName},\n\nThank you for contacting SAHAL SUUQ.\n\n`
    );

    window.location.href =
      `mailto:${message.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2417] sm:text-3xl">
            Contact Messages
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and respond to customer messages.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-[#E5DED1] bg-white px-4 py-3 text-sm font-semibold text-[#2D2417] transition hover:bg-[#F5F0E7] disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* STATISTICS */}
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">

        {[
          {
            label: "Total Messages",
            value: stats.total,
            icon: Inbox,
            color: "text-[#2D2417]",
            bg: "bg-[#F0E9DC]",
          },
          {
            label: "New Messages",
            value: stats.new,
            icon: MessageSquare,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Read Messages",
            value: stats.read,
            icon: Eye,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Replied",
            value: stats.replied,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-[#EAE5DB] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.label}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#2D2417]">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH AND FILTER */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#EAE5DB] bg-white p-4 sm:flex-row">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or message..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#C8A96E]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A96E]"
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* MESSAGES */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE5DB] bg-white shadow-sm">

        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-bold text-[#2D2417]">
            Customer Messages
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {filteredMessages.length} messages found
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <RefreshCw className="animate-spin text-[#C8A96E]" size={28} />
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={fetchMessages}
              className="mt-4 rounded-xl bg-[#2D2417] px-5 py-2 text-sm text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <div className="rounded-full bg-[#F5F0E7] p-5">
              <Inbox size={30} className="text-[#C8A96E]" />
            </div>

            <h3 className="mt-4 font-bold text-[#2D2417]">
              No messages found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Customer messages will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className="flex flex-col gap-4 p-5 transition hover:bg-[#FCFBF9] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0E9DC] font-bold text-[#8B6D3F]">
                    {message.firstName?.charAt(0)?.toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#2D2417]">
                        {message.firstName} {message.lastName}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusStyles[message.status] || statusStyles.new}`}
                      >
                        {message.status}
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <Mail size={13} />
                      {message.email}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {message.message}
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={13} />
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleView(message)}
                    title="View message"
                    className="rounded-lg bg-[#F0E9DC] p-2.5 text-[#6B5130] transition hover:bg-[#E8DCC5]"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    onClick={() => handleReply(message)}
                    title="Reply by email"
                    className="rounded-lg bg-green-50 p-2.5 text-green-700 transition hover:bg-green-100"
                  >
                    <Reply size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(message._id)}
                    title="Delete message"
                    className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MESSAGE DETAILS MODAL */}
      {selectedMessage && (
        <div
          onClick={() => setSelectedMessage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-[#2D2417]">
                  Message Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Customer contact information
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-bold text-[#2D2417]">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Email
                </p>

                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="mt-1 block text-sm text-blue-600 hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Date
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Message
                </p>

                <div className="mt-2 whitespace-pre-wrap rounded-xl bg-[#F8F7F4] p-4 text-sm leading-7 text-gray-700">
                  {selectedMessage.message}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  Update Status
                </p>

                <select
                  value={selectedMessage.status}
                  disabled={updating}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedMessage._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A96E] disabled:opacity-50"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleReply(selectedMessage)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2D2417] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#453724]"
                >
                  <Reply size={17} />
                  Reply by Email
                </button>

                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
