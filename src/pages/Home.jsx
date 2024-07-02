import React, { useRef } from "react";
import { useEffect } from "react";
///rrd import
import { Form, useActionData, useLoaderData } from "react-router-dom/dist";
//reduz
import { useSelector } from "react-redux";
//custom hook

//components
import FormInput from "../components/FormInput";

import TodoList from "../components/TodoList";

//action
export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let complet = formData.get("complet");
  return { title, complet };
};
function Home() {
  return (
    <div className=" aligen-conten grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
      <div className=" p-16">
        <Form
          method="post"
          className=" flex items-center justify-center flex-col  w-72 py-10
          "
        >
          <FormInput
            lebal="Add title"
            name="title"
            type="text"
            plecholder="lernen books"
          />
          <div className="form-control mt-5 ">
            <label className="cursor-pointer label gap-10">
              <span className="label-text ">Comleted</span>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-accent"
                name="complet"
              />
            </label>
          </div>
          <button className="btn btn-primary w-full mt-5">Add</button>
        </Form>
      </div>
      <div className=" flex flex-col my-10 gap-20">
        <TodoList />
      </div>
    </div>
  );
}

export default Home;
