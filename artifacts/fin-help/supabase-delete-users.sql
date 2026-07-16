-- ============================================================
-- Script para eliminar todos los usuarios de Supabase Auth
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Elimina perfiles (tabla propia si existe)
DELETE FROM public.profiles;

-- 2. Elimina las identidades de autenticación
DELETE FROM auth.identities;

-- 3. Elimina las sesiones activas
DELETE FROM auth.sessions;

-- 4. Elimina los refresh tokens
DELETE FROM auth.refresh_tokens;

-- 5. Elimina los usuarios
DELETE FROM auth.users;

-- ============================================================
-- Verifica que todo quedó limpio
-- ============================================================
SELECT COUNT(*) AS usuarios_restantes FROM auth.users;
