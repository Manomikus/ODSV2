# Remplacement des médias fictifs

Le site utilise actuellement des contenus fictifs liés au secteur:
- Photos: URLs Unsplash (dans `index.html` et `portfolio.html`)
- Vidéos: thumbnails + liens YouTube (dans `index.html` et `medias.html`)
- Partenaires: logos fictifs en bandeau (dans `index.html`)

## Remplacer rapidement

1. **Photos portfolio**
- Ouvrir `index.html` et `portfolio.html`
- Remplacer les `src="https://images.unsplash.com/..."` par vos images réelles

2. **Vidéos**
- Ouvrir `index.html` et `medias.html`
- Remplacer les IDs YouTube dans:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`

3. **Partenaires**
- Déposer vos logos dans `assets/media/partners/`
- Mettre à jour les éléments du bandeau dans `index.html`

## Astuce format
- Images recommandées: ratio 16:9, largeur 1400px+
- Logos partenaires: PNG transparent si possible
