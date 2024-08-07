export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
};


export interface SubscriptionCreateResponse   {
  SubscriptionId: string;
  ClientSecret: string;
}
