import NavigationClient from "./NavigationClient";
import { getCategories } from "@/lib/getCategories";

export default async function Navigation() {

  const categories = await getCategories();


  return (

    <NavigationClient

      categories={categories || []}

    />

  );

}