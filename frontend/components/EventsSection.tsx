

//prop structure 
type Props = {
  title: string
  eventsType: "current" | "past"
 }

export default function EventsSection({ title, eventsType }: Props) {
  const groupedEvents; //for now only one event 
  return (
    <section>
      <h2 className="text-4xl font-semibold text-primary mb-12">
        {title}
      </h2>

      <div className="space-y-16">
        {groupedEvents.map((group) => (
          <EventsByMonth
            key={`${group.month}-${group.year}`}
            group={group}
          />
        ))}
      </div>
    </section>
  )
}
