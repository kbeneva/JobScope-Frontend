import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { useUser } from '../context/UserContext';

export default function SignupScreen() {
    const { colors, theme } = useContext(ThemeContext);
    const { user } = useUser(); // add signup when added to context

    return (
        <></>
    );
}