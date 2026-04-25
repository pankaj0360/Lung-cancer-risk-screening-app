import { jwtDecode } from 'jwt-decode';
export const getUserRole = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    console.log('Decoded JWT:', decoded.role);
    return decoded.role || 'patient';
  } catch (error) {
    console.error('Invalid token:', error);
    return 'patient';
  }
};
