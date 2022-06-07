import { Command } from "commander"
import { get, add, deleteItem } from "./actions.js";

const program = new Command();

program
    .name("To Do App :)")
    .description("A CLI To-Do App with a pokemon twist.")
    .version("1.0.0")

program
    .command("get")
    .description("Get all the To-Do items")
    .action(async () => {
        const todos = await get()
        for (let i = 0; i < todos.length; i++) {
            console.log(todos[i])
        }
    })

program
    .command("add")
    .description("Add an item to the To-Do list")
    .argument("<string>", "The item you wish to add to the To-Do list")
    .action(async (item) => {
        try {
            const todos = await add(item)
            "Item has been added successfully"
        } catch (error) {
            console.log(error)
        }
    })
program
    .command("delete")
    .description("Delete an item from the To-Do list")
    .argument("<number>", "The index of the item you wish to delete from the To-Do list")
    .action(async (index) => {
        try {
            deleteItem(index)
            console.log("Item has been deleted :)")
        } catch (error) {
            console.log(error)
        }
    }
    )

program.parse()