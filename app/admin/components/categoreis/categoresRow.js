"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { EditCategoryDialog } from "./EditCategoryDialog"; // Hubi halka uu file-kani kaga yaalo

export function CategoryRow({ Category, update, remove, getAll }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <tr className="border-b hover:bg-muted/40">
        <td className="px-6 py-4">
          <img
            src={Category.image || "https://via.placeholder.com/150"}
            alt={Category.name}
            className="w-12 h-12 rounded object-cover"
          />
        </td>

        <td className="px-6 py-4 font-medium">{Category.name}</td>
        <td className="px-6 py-4 font-medium">{Category.description}</td>

        <td className="px-6 py-4">{Category.count || Category.products || 0}</td>

        <td className="px-6 py-4">
          <div className="flex justify-end gap-2">

            {/* Badhanka Pencil wuxuu furaa Dialog-ka Edit-ka */}
            <Button 
              onClick={() => setIsEditOpen(true)} 
              size="icon" 
              variant="ghost"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button onClick={() => remove(Category._id)} size="icon" variant="ghost">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </td>
      </tr>

      {/* Dialog-ka Update-ka */}
      <EditCategoryDialog
        category={Category}
        open={isEditOpen}
        setOpen={setIsEditOpen}
        update={update}
        getAll={getAll}
      />
    </>
  );
}