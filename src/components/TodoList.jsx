import React, { useState } from "react";
import { useEffect } from "react";
///rrd import
import { Form, useActionData, useLoaderData } from "react-router-dom/dist";
//reduz
import { useDispatch, useSelector } from "react-redux";
//custom hook
import { useCollection } from "../hooks/useCollection";
//components
import FormInput from "../components/FormInput";
//firabase
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfige";
import { errorInputAction } from "../app/userSlice";
import toast from "react-hot-toast";

function TodoList() {
  let { user } = useSelector((state) => state.user);
  let { data } = useCollection("todos", ["uid", "==", user.uid]);
  let dispetch = useDispatch();
  let userData = useActionData();
  useEffect(() => {
    if (userData) {
      if (!(userData.title.trim() == "")) {
        let { title, complet } = userData;
        let newTodo = {
          title: title,
          uid: user.uid,
          complet: complet ? true : false,
        };
        addDoc(collection(db, "todos"), newTodo);
        toast.success(`Add to do ${newTodo.title}`);
      } else {
      }
    }
  }, [userData]);
  let delteDoc = (id) => {
    deleteDoc(doc(db, "todos", id));
    toast.error("Delte to do");
  };
  return (
    <>
      {data &&
        data.map((todo, id) => {
          return (
            <div
              key={id}
              className={`card bg-base-100 w-96 shadow-xl bg-[url('https://thumbs.dreamstime.com/z/to-do-list-white-paper-pencils-background-template-56711188.jpg')] bg-bottom ${
                todo.complet && "opacity-50"
              }`}
            >
              <div className="card-body">
                <h2 className="card-title py-2">{todo.title}</h2>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      delteDoc(todo.id);
                    }}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  {todo.complet ? (
                    <button
                      onClick={() => {
                        updateDoc(doc(db, "todos", todo.id), {
                          complet: !todo.complet,
                        });
                        todo.complet && toast.error("Compelte");
                      }}
                      className="btn "
                    >
                      Bajarilgan
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateDoc(doc(db, "todos", todo.id), {
                          complet: !todo.complet,
                        });
                        !todo.complet &&
                          toast("Good Job!", {
                            icon: "👏",
                          });
                      }}
                      className="btn "
                    >
                      Chekout
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      {!data && (
        <span className="loading loading-ring loading-lg size-36 absolute text-center left-[700px]"></span>
      )}
    </>
  );
}

export default TodoList;
