import { Slot, usePathname } from 'expo-router';
import { PostProvider } from '../PostContext';

export default function Layout() {

  const pathname = usePathname()

  return (
    <PostProvider>
      <Slot/>  
    </PostProvider>
  );
}