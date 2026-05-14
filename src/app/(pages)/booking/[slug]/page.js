import BookingClient from "@/components/booking/BookingClient";

export const metadata = {
  title: "Book Celebrity — StarReach",
};

export default function BookingPage({ params }) {
  return <BookingClient params={params} />;
}