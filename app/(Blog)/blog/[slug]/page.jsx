import BlogContainer from "@/components/blog-container";
import { client } from "@/sanity/lib/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

async function getData(slug) {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == "${slug}"][0]{
      title,
      "name": author->name,
      "slug": slug.current,
      "contImg":  mainImage.asset->url,
      description,
      author->{"name": name, "profilePicture": image.asset->url},
    }
  `,
    { slug }
  );
  return post;
}

export const dynamic = "force-dynamic";

const BlogPost = async ({ params }) => {

  const data = await getData(params.slug);

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto mt-28">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="mx-auto mt-10">
          <div className="flex flex-col max-w-7xl mx-auto overflow-hidden rounded">
            <Image
              src={data.contImg}
              height={700}
              width={1000}
              alt=""
              className="w-full h-[70vh] object-cover object-center"
            />
            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-5xl sm:px-10 lg:rounded-md shadow-lg bg-white dark:bg-black">
              <div className="space-y-2">
                <span className="inline-block text-2xl font-semibold sm:text-3xl">
                  {data.title}
                </span>
                <p className="text-xs flex items-center gap-2 cursor-pointer">
                  <Image
                    src={data.author.profilePicture}
                    height={30}
                    width={30}
                    alt=""
                    className=" rounded-full object-cover object-center"
                  />
                  <span className="text-xs hover:underline">{data.name}</span>
                </p>
              </div>
              <div className="">
                <p>
                  {data?.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Esse libero, beatae reiciendis magnam
                  eveniet eligendi voluptatum eum exercitationem repudiandae
                  voluptatibus doloribus. Possimus incidunt unde temporibus modi
                  eaque nemo sapiente. Quia consequuntur voluptas modi incidunt
                  esse? Nesciunt voluptatum esse molestias, ea quisquam quidem
                  quaerat vel corporis aut earum ex doloribus placeat?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
