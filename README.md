# AutoServiceHoute

## Contact Form -> Supabase Bookings

### Environment variables
Create a `.env.local` file in the project root (and set the same variables in production):

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GARAGE_UUID=
```

- `VITE_GARAGE_UUID` must be the UUID of the tenant garage row in `public.garages`.

### Test a successful submission
1. Run `npm install` and `npm run dev`.
2. Open a page with the contact form.
3. Fill in: name, valid email, license plate, one service, and a description of at least 10 characters.
4. If service is `Overig`, fill in the custom service field.
5. Submit once and confirm success feedback is shown.

### Verify in dashboard bookings/calendar
1. Open Supabase Table Editor and check `public.bookings`.
2. Confirm a new row exists with:
   - `garage_id` = value from `VITE_GARAGE_UUID`
   - `license_plate` normalized (uppercase, no spaces or symbols)
   - `service` mapped from selected option (`Overig` -> custom text)
3. Open the garage dashboard and verify the booking appears in bookings/calendar for that tenant.

### RLS assumptions
The front-end submit flow assumes the following policies are active:
- anon can `insert` into `public.bookings`
- anon cannot `select`, `update`, or `delete` bookings
- insert is allowed only when `garage_id` exists in `public.garages`
