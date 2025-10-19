"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar } from "lucide-react"
import type { Workout } from "@/app/page"

type WorkoutHistoryProps = {
  workouts: Workout[]
  onDelete: (id: string) => void
}

export function WorkoutHistory({ workouts, onDelete }: WorkoutHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  if (workouts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No workouts logged yet. Complete your first workout to see it here!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{formatDate(workout.date)}</CardTitle>
                <CardDescription>
                  {workout.exercises.length} exercise{workout.exercises.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onDelete(workout.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {workout.exercises.map((exercise) => (
              <div key={exercise.id} className="space-y-2">
                <h4 className="font-semibold">{exercise.name}</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="font-medium text-muted-foreground">Set</div>
                  <div className="font-medium text-muted-foreground">Reps</div>
                  <div className="font-medium text-muted-foreground">Weight</div>
                  {exercise.sets.map((set, idx) => (
                    <>
                      <div key={`set-${idx}`}>{idx + 1}</div>
                      <div key={`reps-${idx}`}>{set.reps}</div>
                      <div key={`weight-${idx}`}>{set.weight} lbs</div>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
