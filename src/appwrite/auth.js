import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                this.login({email, password});
            }
            else return userAccount;
        }catch(err){
            throw err;
        }
    }

    async login({email, password}){
        try{
            const userLogin = await this.account.createEmailPasswordSession(email, password);
            return userLogin;
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            const foundUser = await this.account.get();
            return foundUser;
        }catch(err){
            throw err;
        }
        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions(); 
        }catch(err){
            throw err;
        }
    }
};

const authService = new AuthService();

export default authService