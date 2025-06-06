'use client';

import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {

    //Init user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        //onAuthState is a listener which listens to the login and logout changes
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        //whenever the component(NAvbar) reloads or disappears stop listeneing to it
        return () => unsubscribe();
    });



    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image height={120} width={150} src="/filmyfy-icon-white.svg" alt="Filmyfy icon" />
            </Link>
            {
               user && <Upload />
            }
            <SignIn user={user} />
        </nav>
    );
}