"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import CustomersTable from "../components/customers/customerTable";
import CustomerFilters from "../components/customers/customerFilter";
import CustomerStats from "../components/customers/customerStates";
import useUsers from "../../hook/userUse";


export default function CustomersPage() {
  const {
    items: users,
    getAll,
    remove,
  } = useUsers();

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  useEffect(() => {
    getAll();
  }, [getAll]);

  // Handle different API response structures
  const customersList = useMemo(() => {
    if (Array.isArray(users)) {
      return users;
    }

    if (Array.isArray(users?.data)) {
      return users.data;
    }

    if (Array.isArray(users?.users)) {
      return users.users;
    }

    if (
      Array.isArray(
        users?.customers
      )
    ) {
      return users.customers;
    }

    return [];
  }, [users]);

  // Search + Status Filter
  const filteredCustomers = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return customersList.filter(
      (customer) => {
        const name =
          customer.name?.toLowerCase() ||
          "";

        const email =
          customer.email?.toLowerCase() ||
          "";

        const matchesSearch =
          name.includes(searchValue) ||
          email.includes(searchValue);

        const matchesStatus =
          statusFilter === "All" ||
          customer.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    customersList,
    search,
    statusFilter,
  ]);

  // Sorting
  const sortedCustomers = useMemo(() => {
    const list = [
      ...filteredCustomers,
    ];

    if (sortBy === "Newest") {
      return list.sort(
        (a, b) =>
          new Date(
            b.createdAt ||
              b.joinedAt ||
              0
          ) -
          new Date(
            a.createdAt ||
              a.joinedAt ||
              0
          )
      );
    }

    if (sortBy === "Oldest") {
      return list.sort(
        (a, b) =>
          new Date(
            a.createdAt ||
              a.joinedAt ||
              0
          ) -
          new Date(
            b.createdAt ||
              b.joinedAt ||
              0
          )
      );
    }

    if (
      sortBy === "Top Spending"
    ) {
      return list.sort(
        (a, b) =>
          Number(
            b.totalSpent ||
              b.spent ||
              0
          ) -
          Number(
            a.totalSpent ||
              a.spent ||
              0
          )
      );
    }

    return list;
  }, [
    filteredCustomers,
    sortBy,
  ]);

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Customers
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and view your customers
          </p>
        </div>

        {/* Stats */}
        <CustomerStats
          customers={customersList}
        />

        {/* Filters */}
        <CustomerFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={
            setStatusFilter
          }
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Customers */}
        <CustomersTable
          customers={sortedCustomers}
          remove={remove}
          getAll={getAll}
        />
      </div>
    </main>
  );
}