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
    .action(() => {
        get()
    })

program
    .command("add")
    .description("Add an item to the To-Do list")
    .argument("<string>", "The item you wish to add to the To-Do list")
    .action((item) => {
        add(item)
    })

program
    .command("delete")
    .description("Delete an item from the To-Do list")
    .argument("<number>", "The index of the item you wish to delete from the To-Do list")
    .action((index) => {
        deleteItem(index)
    }
    )

program.parse()