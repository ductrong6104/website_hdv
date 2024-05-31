// UserSession.ts
class UserSession {
    private static instance: UserSession;
    private user: any;
  
    private constructor() {
      this.user = null;
    }
  
    public static getInstance(): UserSession {
      if (!UserSession.instance) {
        UserSession.instance = new UserSession();
      }
      return UserSession.instance;
    }
  
    public setUser(user: any): void {
      this.user = user;
    }
  
    public getUser(): any {
      return this.user;
    }
  }
  
  export default UserSession;
  