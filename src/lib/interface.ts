export interface UserProps {
  id: string;
  name: string;
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
