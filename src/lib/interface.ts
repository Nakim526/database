export interface UserProps {
  id: string;
  username: string;
  email: string;
  status: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  fullname: string;
  email: string;
  password: string;
}
