import PocketBase from "pocketbase";

export const pb = new PocketBase("http://139.144.4.226");

pb.collection("users").authWithPassword("gxhamster", "i@meedhoo");
