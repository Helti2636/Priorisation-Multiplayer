import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import Game from "@/pages/game";
import Facilitator from "@/pages/facilitator";
import NotFound from "@/pages/not-found";
import "./training.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/game/:roomCode" component={Game} />
      <Route path="/facilitator/:roomCode" component={Facilitator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
