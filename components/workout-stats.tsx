"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Dumbbell, Calendar, Target } from "lucide-react"
import type { Workout } from "@/app/page"

type WorkoutStatsProps = {
  workouts: Workout[]
}

export function WorkoutStats({ workouts }: WorkoutStatsProps) {
  const totalWorkouts = workouts.length
  const totalExercises = workouts.reduce((sum, workout) => sum + workout.exercises.length, 0)
  const totalSets = workouts.reduce(
    (sum, workout) => sum + workout.exercises.reduce((exSum, exercise) => exSum + exercise.sets.length, 0),
    0,
  )
  const totalVolume = workouts.reduce(
    (sum, workout) =>
      sum +
      workout.exercises.reduce(
        (exSum, exercise) => exSum + exercise.sets.reduce((setSum, set) => setSum + set.reps * set.weight, 0),
        0,
      ),
    0,
  )

  // Get exercise frequency
  const exerciseFrequency = new Map<string, number>()
  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      exerciseFrequency.set(exercise.name, (exerciseFrequency.get(exercise.name) || 0) + 1)
    })
  })

  const topExercises = Array.from(exerciseFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (workouts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Complete some workouts to see your progress stats!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">Keep up the consistency!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exercises</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExercises}</div>
            <p className="text-xs text-muted-foreground">Across all workouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sets</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSets}</div>
            <p className="text-xs text-muted-foreground">Sets completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">lbs lifted (reps × weight)</p>
          </CardContent>
        </Card>
      </div>

      {topExercises.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Exercises</CardTitle>
            <CardDescription>Your top exercises by workout frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topExercises.map(([name, count], idx) => (
                <div key={name} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium leading-none">{name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {count} workout{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(count / topExercises[0][1]) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
