"use client"

import { useState } from "react"
import { WorkoutLogger } from "@/components/workout-logger"
import { WorkoutHistory } from "@/components/workout-history"
import { WorkoutStats } from "@/components/workout-stats"
import { Dumbbell, History, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type Exercise = {
  id: string
  name: string
  sets: {
    reps: number
    weight: number
  }[]
}

export type Workout = {
  id: string
  date: Date
  exercises: Exercise[]
}

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const addWorkout = (exercises: Exercise[]) => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      date: new Date(),
      exercises,
    }
    setWorkouts([newWorkout, ...workouts])
  }

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-balance">Lift Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your strength journey</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="log" className="gap-2">
              <Dumbbell className="h-4 w-4" />
              <span className="hidden sm:inline">Log Workout</span>
              <span className="sm:hidden">Log</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="mt-0">
            <WorkoutLogger onSave={addWorkout} />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <WorkoutHistory workouts={workouts} onDelete={deleteWorkout} />
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <WorkoutStats workouts={workouts} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
