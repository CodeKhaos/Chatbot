import { defineFunction } from "@aws-amplify/backend";
    
const myFirstFunction = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
});