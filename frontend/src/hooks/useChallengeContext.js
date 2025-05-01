import { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";

export function useChallengeContext() {
    return useContext(ChallengeContext); 
}