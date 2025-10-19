"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import type { Exercise } from "@/app/page"

type WorkoutLoggerProps = {
  onSave: (exercises: Exercise[]) => void
}

export function WorkoutLogger({ onSave }: WorkoutLoggerProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState("")

  const addExercise = () => {
    if (!currentExercise.trim()) return

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: currentExercise,
      sets: [{ reps: 0, weight: 0 }],
    }
    setExercises([...exercises, newExercise])
    setCurrentExercise("")
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) => (ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0 }] } : ex)),
    )
  }

  const updateSet = (exerciseId: string, setIndex: number, field: "reps" | "weight", value: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) => (idx === setIndex ? { ...set, [field]: value } : set)),
            }
          : ex,
      ),
    )
  }

  const removeSet = (exerciseId: string, setIndex: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets: ex.sets.filter((_, idx) => idx !== setIndex) } : ex,
      ),
    )
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  const saveWorkout = () => {
    if (exercises.length === 0) return
    onSave(exercises)
    setExercises([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Exercise</CardTitle>
          <CardDescription>Start by adding an exercise to your workout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Exercise name (e.g., Bench Press)"
              value={currentExercise}
              onChange={(e) => setCurrentExercise(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addExercise()}
              className="flex-1"
            />
            <Button onClick={addExercise} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {exercises.length > 0 && (
        <>
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => removeExercise(exercise.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exercise.sets.map((set, idx) => (
                    <div key={idx} className="flex items-end gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`reps-${exercise.id}-${idx}`} className="text-xs">
                          Reps
                        </Label>
                        <Input
                          id={`reps-${exercise.id}-${idx}`}
                          type="number"
                          min="0"
                          value={set.reps || ""}
                          onChange={(e) => updateSet(exercise.id, idx, "reps", Number.parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`weight-${exercise.id}-${idx}`} className="text-xs">
                          Weight (lbs)
                        </Label>
                        <Input
                          id={`weight-${exercise.id}-${idx}`}
                          type="number"
                          min="0"
                          step="5"
                          value={set.weight || ""}
                          onChange={(e) => updateSet(exercise.id, idx, "weight", Number.parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSet(exercise.id, idx)}
                        disabled={exercise.sets.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addSet(exercise.id)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Set
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={saveWorkout} size="lg" className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Workout
          </Button>
        </>
      )}

      {exercises.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No exercises added yet. Start by adding your first exercise above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
