import { myFirstFunction, ablyFunction } from '@/amplify/my-first-function/resource';
import { defineBackend } from '@aws-amplify/backend';

defineBackend({myFirstFunction})
defineBackend({ablyFunction})