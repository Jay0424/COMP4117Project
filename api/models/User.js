/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    username: {
      type: "string"
    },
    
    password: {
      type: "string"
    },

    email: {
      type: "string"
    },

    department:{
      type: "string"
    },

    position:{
      type:"string"
    },

    role:{
      type:"string",
      defaultsTo:"user",
    },

    bookborrow:{
      collection:"Book",
      via:"bookborrowBy"
    },

    gameborrow:{
      collection:"Game",
      via:"gameborrowBy"
    },

    materialborrow:{
      collection:"Material",
      via:"materialborrowBy"
    },

    bookhistory:{
      collection:"Book",
      via:"bookhistoryBy"
    },

    gamehistory:{
      collection:"Game",
      via:"gamehistoryBy"
    }



    

  },

};

