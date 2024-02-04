/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs/UserTabs";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((cat) => {
        console.log(cat.length);
        setCategories(cat);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    console.log(categoryName);
    if (
      categoryName == null ||
      categoryName == undefined ||
      categoryName == ""
    ) {
      await toast.error("Please enter a new category name");
    } else {
      const creationPromise = new Promise(async (resolve, reject) => {
        const data = { name: categoryName };
        console.log(categoryName);
        if (editCategory) {
          data._id = editCategory._id;
        }
        const response = await fetch("/api/categories", {
          method: editCategory ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        setCategoryName("");
        fetchCategories();
        setEditCategory(null);
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
      toast.promise(creationPromise, {
        loading: editCategory ? "Updating category" : "Creating category",
        success: editCategory
          ? "Category updated successfully"
          : "Category created successfully",
        error: "Error,Sorry....",
      });
    }
  }
  if (profileLoading) {
    return "User profile is loading";
  }
  if (!profileData.IsAdmin) {
    return "Not an Admin";
  }
  return (
    <>
      <section className="my-8 max-w-md mx-auto">
        <UserTabs isAdmin={true} />
        <form className="mt-8" onSubmit={handleCategorySubmit}>
          <div className="flex gap-2 items-end">
            <div className="grow">
              <label>
                {editCategory ? (
                  <span>Update Category {editCategory.name}</span>
                ) : (
                  "New Category name"
                )}
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(ev) => setCategoryName(ev.target.value)}
              />
            </div>
            <div className="pb-2">
              <button type="submit">
                {editCategory ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
        <div>
          <h1 className="mt-8 text-sm text-gray-500">Edit Category</h1>
          {categories?.length > 0 &&
            categories.map((c) => (
              <button
                onClick={() => {
                  setEditCategory(c);
                  setCategoryName(c.name);
                }}
                className="flex gap-1 bg-gray-300 p-2 mt-1 px-4 mb-2 rounded-lg cursor-pointer"
              >
                <span> {c.name}</span>
              </button>
            ))}
        </div>
      </section>
    </>
  );
}
