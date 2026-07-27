import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

import type {
  HomepageData,
} from "./types";


export async function getHomepageData(): Promise<HomepageData> {


  const baseFilter = {

    status: PostStatus.approved,

    isDeleted:false,

    isAstrology:false,

  };


  const allArticles = await prisma.article.findMany({

    where: baseFilter,

    include:{
      category:true,
    },

    orderBy:[

      {
        homepagePriority:"desc",
      },

      {
        featured:"desc",
      },

      {
        publishedAt:"desc",
      },

      {
        createdAt:"desc",
      },

    ],

    take:80,

  });



  const mostRead = await prisma.article.findMany({

    where:baseFilter,

    include:{
      category:true,
    },

    orderBy:{
      views:"desc",
    },

    take:5,

  });



  const trending = await prisma.article.findMany({

    where:baseFilter,

    include:{
      category:true,
    },

    orderBy:{
      trendingScore:"desc",
    },

    take:5,

  });



  const breaking = allArticles
    .filter(article =>
      article.breaking || article.flash
    )
    .slice(0,5);



  const editorsPick = allArticles
    .filter(article =>
      article.isEditorsPick
    )
    .slice(0,6);



  const hero =
    allArticles.find(article =>
      article.featured
    )
    ||
    allArticles[0]
    ||
    null;



  function byCategory(slug:string){

    return allArticles
      .filter(article =>
        article.category?.slug === slug
      )
      .slice(0,6);

  }



  const result:HomepageData = {


    hero,


    breaking,


    editorsPick,


    topStories:
      allArticles
      .filter(a => a.id !== hero?.id)
      .slice(0,5),


    national:
      byCategory("national"),


    defence:
      byCategory("defence"),


    economy:
      byCategory("economy"),


    technology:
      byCategory("technology"),


    opinion:
      allArticles
      .filter(a=>a.isEditorial)
      .slice(0,6),


    latest:
      allArticles.slice(10,30),


    mostRead,


    trending,


  };


  return result;

}