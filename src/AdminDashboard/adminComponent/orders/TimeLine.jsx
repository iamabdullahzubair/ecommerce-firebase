

const Timeline = ({ events }) => {

  function formatDate(timestamp) {
    const date = timestamp.toDate()
    const formattedDate = date.toLocaleString("en-US", {
      month: "short", // Aug
      day: "numeric", // 20
      year: "numeric", // 2024
      // hour: 'numeric',  // 4
      // minute: 'numeric',// 00 (optional)
      // hour12: true      // 12-hour format with am/pm
    });
    return formattedDate;
  }
  return (
    <>
      <ul className="space-y-6 relative">
        {" "}
        {/* Spacing between events */}
        {events.map((event, index) => (
          <li
            key={index}
            className="relative pl-8 flex items-start justify-between"
          >
            {/* Status Icon and connecting line */}
            <div className="absolute left-3 top-px flex flex-col items-center z-10">
              <div
                className={`w-5 h-5 p-[1.5px] rounded-full flex items-center justify-center dark:bg-gray-800 ${
                  event?.completed
                    ? "border-2 border-green-500 text-green-500"
                    : "border-2 border-gray-500 "
                }`}
              >
                {event?.completed ? (
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                )}
              </div>
            </div>

            {/* Event Content */}
            <div className="ml-4 flex-1">
              <p className="text-sm dark:text-gray-200 font-semibold">
                {event.status}
              </p>
              <p className="text-xs dark:text-gray-200">{event.desc}</p>
              {/* <p className="text-sm dark:text-gray-200">{event.title}</p> */}
              {event?.email && (
                <p className="text-xs">
                  Invoice email was sent to{" "}
                  <a
                    href={`mailto:${event?.email}`}
                    className="text-blue-400 underline"
                  >
                    {event?.email}
                  </a>
                </p>
              )}
              <p className="text-xs text-gray-400">
                Confirmed by {event?.confirmedBy || "team exclusive"}
              </p>
            </div>
            <div className="w-28 text-end">
              <p className="text-sm">
                {formatDate(event?.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <span className="absolute top-0 left-[21px] block w-0.5 h-full bg-gray-200"></span>
    </>
  );
};

export default Timeline;
