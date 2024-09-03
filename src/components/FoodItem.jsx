import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { PAGESTATE } from "../constants";
import Skeleton from "react-loading-skeleton";
import Loader from "./Loader";

export default function FoodItem() {
  const [recipe, setRecipe] = useState({
    uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_fe97032f05b141428abc015e462739d9",
    label: "Jamaican jerk chicken",
    image:
      "https://edamam-product-images.s3.amazonaws.com/web-img/05b/05b69e86d6af7eb3795d6d5d5a400fc5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrtjG7fXIqGCZhNUKTK7Z9p7ReEXfhRaxL3fvwQckQ9AIgKEA2yynevvvJJGCwIkKDfOm40UYMqhjphPAlMar0JhcqwgUIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBEHapZ%2F0HO9lVeyIiqWBR7lCH75YRzKftnTPqd%2FqOwUh%2FQNE0Or7Gnpg2PQPizvUODfjWglfnWnVufhiDgsCNvEtJB6dn6oD78EABDrCHOV8iU2kr7G0b1PvhZMMqLHF5g%2FENz7tU42AIrgWsano8pJ2c%2FqE5pJ4kJCsyngjNJEO87tLe7C4opMPbr7Sh9kJ3UnKsCXpcssOFaSMMsXyIOTooyFsuYkSRz42U%2BuCZz8Mab3t38RsnKi%2F3s%2B2s3VrgUHgcrwbzZKSP45EB1HKKzPSQkZo239sM6lX2hwwQ6j3l%2F0aJ6oswHm%2F%2FQoAl%2FDVCRIJ0SuDqZ2Qi2Am5DpheoxUIG2KMwieJsqNfkf4%2BY0luU4bHd4D6ssV8DdqCqvttlkaUYEk%2BAgvKmrvtshbjta8BgT2amv29qsq4uSle933Fmur%2FNQ97HZQQ0VwTztsDQUOgv6xAxw07s%2By99%2BP1kEs2PcsnGvxL3evArbvob6yjKZb6D1VSccxC35f77R4FVOquPOqvwBeKtmQdXxhsC7VXGJirLwIxuDnoQLsUftcPN56VH%2BBhODFG2xwzepvS8Ib7B7c0aMeh%2FxMAuGxzd2X73LMtYgy%2FQU1WGy1CylYNQSc%2FLM%2BBzAo9HGENrcBiBmoXqwdcVtG2ZHn0U1QxIuqE3sBdMvpPHhUOEpRbsk7YVTZIbkwNNt5VUJ5CNoVV882NTFPA%2BmoV6sTbZlVewy3pRE%2Bchv76pPahoiuRnFvL4Y0%2FJDxbYGPQjgB%2Br40x77gkewRTvFexC%2B9HX2BuogSGcyxKhWNcdRcdOsT2O1UFSa8MYF9SyI696RYbLjWkie8%2BRQHygPVZUfHw5LlpHECt%2FBrSVj9GHX27jTCXbZkiRAFf42uspjnb1Zrzc5be8QXNClMJvOorYGOrEB6bBns1hP48vAn4qo1eDCNOhKY8YbsdwMkdGuPrOzR0FnCFaWCFIrCR4wSVqlxrb%2BPGOxBxK0u9a8qwqEJgNTM3Iu3Z9dsPg%2FAAZcnM6tAnRJteVzdkJUqIw8kEeS2zQq0H69AqI23o%2FHfh0%2FAhIaCymZ13LYrji7nvP4tw6yqeNVRFZE6iDzDJNOlv58e1%2FfAPs0SkydfpRZUBKwXOXCg6wwE0svPeTPHhkEa8ofBHtY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240823T153944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIDYZHPXL%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=78d534cbb890b238d233fca3a94a3a4a348c3e76e89b869876c4e3f873f2e6d6",
    images: {
      THUMBNAIL: {
        url: "https://edamam-product-images.s3.amazonaws.com/web-img/05b/05b69e86d6af7eb3795d6d5d5a400fc5-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrtjG7fXIqGCZhNUKTK7Z9p7ReEXfhRaxL3fvwQckQ9AIgKEA2yynevvvJJGCwIkKDfOm40UYMqhjphPAlMar0JhcqwgUIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBEHapZ%2F0HO9lVeyIiqWBR7lCH75YRzKftnTPqd%2FqOwUh%2FQNE0Or7Gnpg2PQPizvUODfjWglfnWnVufhiDgsCNvEtJB6dn6oD78EABDrCHOV8iU2kr7G0b1PvhZMMqLHF5g%2FENz7tU42AIrgWsano8pJ2c%2FqE5pJ4kJCsyngjNJEO87tLe7C4opMPbr7Sh9kJ3UnKsCXpcssOFaSMMsXyIOTooyFsuYkSRz42U%2BuCZz8Mab3t38RsnKi%2F3s%2B2s3VrgUHgcrwbzZKSP45EB1HKKzPSQkZo239sM6lX2hwwQ6j3l%2F0aJ6oswHm%2F%2FQoAl%2FDVCRIJ0SuDqZ2Qi2Am5DpheoxUIG2KMwieJsqNfkf4%2BY0luU4bHd4D6ssV8DdqCqvttlkaUYEk%2BAgvKmrvtshbjta8BgT2amv29qsq4uSle933Fmur%2FNQ97HZQQ0VwTztsDQUOgv6xAxw07s%2By99%2BP1kEs2PcsnGvxL3evArbvob6yjKZb6D1VSccxC35f77R4FVOquPOqvwBeKtmQdXxhsC7VXGJirLwIxuDnoQLsUftcPN56VH%2BBhODFG2xwzepvS8Ib7B7c0aMeh%2FxMAuGxzd2X73LMtYgy%2FQU1WGy1CylYNQSc%2FLM%2BBzAo9HGENrcBiBmoXqwdcVtG2ZHn0U1QxIuqE3sBdMvpPHhUOEpRbsk7YVTZIbkwNNt5VUJ5CNoVV882NTFPA%2BmoV6sTbZlVewy3pRE%2Bchv76pPahoiuRnFvL4Y0%2FJDxbYGPQjgB%2Br40x77gkewRTvFexC%2B9HX2BuogSGcyxKhWNcdRcdOsT2O1UFSa8MYF9SyI696RYbLjWkie8%2BRQHygPVZUfHw5LlpHECt%2FBrSVj9GHX27jTCXbZkiRAFf42uspjnb1Zrzc5be8QXNClMJvOorYGOrEB6bBns1hP48vAn4qo1eDCNOhKY8YbsdwMkdGuPrOzR0FnCFaWCFIrCR4wSVqlxrb%2BPGOxBxK0u9a8qwqEJgNTM3Iu3Z9dsPg%2FAAZcnM6tAnRJteVzdkJUqIw8kEeS2zQq0H69AqI23o%2FHfh0%2FAhIaCymZ13LYrji7nvP4tw6yqeNVRFZE6iDzDJNOlv58e1%2FfAPs0SkydfpRZUBKwXOXCg6wwE0svPeTPHhkEa8ofBHtY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240823T153944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIDYZHPXL%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=649f3d7f0873d94ed8e82809eddfe04846f55c9a297351310f0b072fa59c02d8",
        width: 100,
        height: 100,
      },
      SMALL: {
        url: "https://edamam-product-images.s3.amazonaws.com/web-img/05b/05b69e86d6af7eb3795d6d5d5a400fc5-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrtjG7fXIqGCZhNUKTK7Z9p7ReEXfhRaxL3fvwQckQ9AIgKEA2yynevvvJJGCwIkKDfOm40UYMqhjphPAlMar0JhcqwgUIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBEHapZ%2F0HO9lVeyIiqWBR7lCH75YRzKftnTPqd%2FqOwUh%2FQNE0Or7Gnpg2PQPizvUODfjWglfnWnVufhiDgsCNvEtJB6dn6oD78EABDrCHOV8iU2kr7G0b1PvhZMMqLHF5g%2FENz7tU42AIrgWsano8pJ2c%2FqE5pJ4kJCsyngjNJEO87tLe7C4opMPbr7Sh9kJ3UnKsCXpcssOFaSMMsXyIOTooyFsuYkSRz42U%2BuCZz8Mab3t38RsnKi%2F3s%2B2s3VrgUHgcrwbzZKSP45EB1HKKzPSQkZo239sM6lX2hwwQ6j3l%2F0aJ6oswHm%2F%2FQoAl%2FDVCRIJ0SuDqZ2Qi2Am5DpheoxUIG2KMwieJsqNfkf4%2BY0luU4bHd4D6ssV8DdqCqvttlkaUYEk%2BAgvKmrvtshbjta8BgT2amv29qsq4uSle933Fmur%2FNQ97HZQQ0VwTztsDQUOgv6xAxw07s%2By99%2BP1kEs2PcsnGvxL3evArbvob6yjKZb6D1VSccxC35f77R4FVOquPOqvwBeKtmQdXxhsC7VXGJirLwIxuDnoQLsUftcPN56VH%2BBhODFG2xwzepvS8Ib7B7c0aMeh%2FxMAuGxzd2X73LMtYgy%2FQU1WGy1CylYNQSc%2FLM%2BBzAo9HGENrcBiBmoXqwdcVtG2ZHn0U1QxIuqE3sBdMvpPHhUOEpRbsk7YVTZIbkwNNt5VUJ5CNoVV882NTFPA%2BmoV6sTbZlVewy3pRE%2Bchv76pPahoiuRnFvL4Y0%2FJDxbYGPQjgB%2Br40x77gkewRTvFexC%2B9HX2BuogSGcyxKhWNcdRcdOsT2O1UFSa8MYF9SyI696RYbLjWkie8%2BRQHygPVZUfHw5LlpHECt%2FBrSVj9GHX27jTCXbZkiRAFf42uspjnb1Zrzc5be8QXNClMJvOorYGOrEB6bBns1hP48vAn4qo1eDCNOhKY8YbsdwMkdGuPrOzR0FnCFaWCFIrCR4wSVqlxrb%2BPGOxBxK0u9a8qwqEJgNTM3Iu3Z9dsPg%2FAAZcnM6tAnRJteVzdkJUqIw8kEeS2zQq0H69AqI23o%2FHfh0%2FAhIaCymZ13LYrji7nvP4tw6yqeNVRFZE6iDzDJNOlv58e1%2FfAPs0SkydfpRZUBKwXOXCg6wwE0svPeTPHhkEa8ofBHtY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240823T153944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIDYZHPXL%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e223248f6d2b89081b58f94288281e7a15282332457add7328219d9d8f9a302b",
        width: 200,
        height: 200,
      },
      REGULAR: {
        url: "https://edamam-product-images.s3.amazonaws.com/web-img/05b/05b69e86d6af7eb3795d6d5d5a400fc5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrtjG7fXIqGCZhNUKTK7Z9p7ReEXfhRaxL3fvwQckQ9AIgKEA2yynevvvJJGCwIkKDfOm40UYMqhjphPAlMar0JhcqwgUIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBEHapZ%2F0HO9lVeyIiqWBR7lCH75YRzKftnTPqd%2FqOwUh%2FQNE0Or7Gnpg2PQPizvUODfjWglfnWnVufhiDgsCNvEtJB6dn6oD78EABDrCHOV8iU2kr7G0b1PvhZMMqLHF5g%2FENz7tU42AIrgWsano8pJ2c%2FqE5pJ4kJCsyngjNJEO87tLe7C4opMPbr7Sh9kJ3UnKsCXpcssOFaSMMsXyIOTooyFsuYkSRz42U%2BuCZz8Mab3t38RsnKi%2F3s%2B2s3VrgUHgcrwbzZKSP45EB1HKKzPSQkZo239sM6lX2hwwQ6j3l%2F0aJ6oswHm%2F%2FQoAl%2FDVCRIJ0SuDqZ2Qi2Am5DpheoxUIG2KMwieJsqNfkf4%2BY0luU4bHd4D6ssV8DdqCqvttlkaUYEk%2BAgvKmrvtshbjta8BgT2amv29qsq4uSle933Fmur%2FNQ97HZQQ0VwTztsDQUOgv6xAxw07s%2By99%2BP1kEs2PcsnGvxL3evArbvob6yjKZb6D1VSccxC35f77R4FVOquPOqvwBeKtmQdXxhsC7VXGJirLwIxuDnoQLsUftcPN56VH%2BBhODFG2xwzepvS8Ib7B7c0aMeh%2FxMAuGxzd2X73LMtYgy%2FQU1WGy1CylYNQSc%2FLM%2BBzAo9HGENrcBiBmoXqwdcVtG2ZHn0U1QxIuqE3sBdMvpPHhUOEpRbsk7YVTZIbkwNNt5VUJ5CNoVV882NTFPA%2BmoV6sTbZlVewy3pRE%2Bchv76pPahoiuRnFvL4Y0%2FJDxbYGPQjgB%2Br40x77gkewRTvFexC%2B9HX2BuogSGcyxKhWNcdRcdOsT2O1UFSa8MYF9SyI696RYbLjWkie8%2BRQHygPVZUfHw5LlpHECt%2FBrSVj9GHX27jTCXbZkiRAFf42uspjnb1Zrzc5be8QXNClMJvOorYGOrEB6bBns1hP48vAn4qo1eDCNOhKY8YbsdwMkdGuPrOzR0FnCFaWCFIrCR4wSVqlxrb%2BPGOxBxK0u9a8qwqEJgNTM3Iu3Z9dsPg%2FAAZcnM6tAnRJteVzdkJUqIw8kEeS2zQq0H69AqI23o%2FHfh0%2FAhIaCymZ13LYrji7nvP4tw6yqeNVRFZE6iDzDJNOlv58e1%2FfAPs0SkydfpRZUBKwXOXCg6wwE0svPeTPHhkEa8ofBHtY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240823T153944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIDYZHPXL%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=78d534cbb890b238d233fca3a94a3a4a348c3e76e89b869876c4e3f873f2e6d6",
        width: 300,
        height: 300,
      },
      LARGE: {
        url: "https://edamam-product-images.s3.amazonaws.com/web-img/05b/05b69e86d6af7eb3795d6d5d5a400fc5-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrtjG7fXIqGCZhNUKTK7Z9p7ReEXfhRaxL3fvwQckQ9AIgKEA2yynevvvJJGCwIkKDfOm40UYMqhjphPAlMar0JhcqwgUIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBEHapZ%2F0HO9lVeyIiqWBR7lCH75YRzKftnTPqd%2FqOwUh%2FQNE0Or7Gnpg2PQPizvUODfjWglfnWnVufhiDgsCNvEtJB6dn6oD78EABDrCHOV8iU2kr7G0b1PvhZMMqLHF5g%2FENz7tU42AIrgWsano8pJ2c%2FqE5pJ4kJCsyngjNJEO87tLe7C4opMPbr7Sh9kJ3UnKsCXpcssOFaSMMsXyIOTooyFsuYkSRz42U%2BuCZz8Mab3t38RsnKi%2F3s%2B2s3VrgUHgcrwbzZKSP45EB1HKKzPSQkZo239sM6lX2hwwQ6j3l%2F0aJ6oswHm%2F%2FQoAl%2FDVCRIJ0SuDqZ2Qi2Am5DpheoxUIG2KMwieJsqNfkf4%2BY0luU4bHd4D6ssV8DdqCqvttlkaUYEk%2BAgvKmrvtshbjta8BgT2amv29qsq4uSle933Fmur%2FNQ97HZQQ0VwTztsDQUOgv6xAxw07s%2By99%2BP1kEs2PcsnGvxL3evArbvob6yjKZb6D1VSccxC35f77R4FVOquPOqvwBeKtmQdXxhsC7VXGJirLwIxuDnoQLsUftcPN56VH%2BBhODFG2xwzepvS8Ib7B7c0aMeh%2FxMAuGxzd2X73LMtYgy%2FQU1WGy1CylYNQSc%2FLM%2BBzAo9HGENrcBiBmoXqwdcVtG2ZHn0U1QxIuqE3sBdMvpPHhUOEpRbsk7YVTZIbkwNNt5VUJ5CNoVV882NTFPA%2BmoV6sTbZlVewy3pRE%2Bchv76pPahoiuRnFvL4Y0%2FJDxbYGPQjgB%2Br40x77gkewRTvFexC%2B9HX2BuogSGcyxKhWNcdRcdOsT2O1UFSa8MYF9SyI696RYbLjWkie8%2BRQHygPVZUfHw5LlpHECt%2FBrSVj9GHX27jTCXbZkiRAFf42uspjnb1Zrzc5be8QXNClMJvOorYGOrEB6bBns1hP48vAn4qo1eDCNOhKY8YbsdwMkdGuPrOzR0FnCFaWCFIrCR4wSVqlxrb%2BPGOxBxK0u9a8qwqEJgNTM3Iu3Z9dsPg%2FAAZcnM6tAnRJteVzdkJUqIw8kEeS2zQq0H69AqI23o%2FHfh0%2FAhIaCymZ13LYrji7nvP4tw6yqeNVRFZE6iDzDJNOlv58e1%2FfAPs0SkydfpRZUBKwXOXCg6wwE0svPeTPHhkEa8ofBHtY&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240823T153944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIDYZHPXL%2F20240823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8d317f2fd879de7c8567f2ae91ee2251dff85ffc253bb0cdc912e1a4e3eb16ca",
        width: 600,
        height: 600,
      },
    },
    source: "BBC Good Food",
    url: "https://www.bbcgoodfood.com/recipes/jamaican-jerk-chicken",
    shareAs: "http://www.edamam.com/recipe/jamaican-jerk-chicken-fe97032f05b141428abc015e462739d9/-",
    yield: 2,
    dietLabels: ["Low-Carb"],
    healthLabels: ["Sugar-Conscious", "Low Sugar", "Keto-Friendly", "Paleo", "Dairy-Free", "Gluten-Free", "Wheat-Free", "Egg-Free", "Peanut-Free", "Tree-Nut-Free", "Soy-Free", "Fish-Free", "Shellfish-Free", "Pork-Free", "Red-Meat-Free", "Crustacean-Free", "Celery-Free", "Mustard-Free", "Sesame-Free", "Lupine-Free", "Mollusk-Free", "Alcohol-Free", "No oil added", "Sulfite-Free", "FODMAP-Free", "Kosher"],
    cautions: [],
    ingredientLines: ["2 chicken thighs", "2 chicken legs"],
    ingredients: [
      {
        text: "2 chicken thighs",
        quantity: 2,
        measure: "<unit>",
        food: "chicken thighs",
        weight: 386,
        foodCategory: "Poultry",
        foodId: "food_bsarl08be0gwarb34bpviafna9d4",
        image: "https://www.edamam.com/food-img/007/00792642367e1f55de680762f85cfb3b.jpg",
      },
      {
        text: "2 chicken legs",
        quantity: 2,
        measure: "<unit>",
        food: "chicken legs",
        weight: 688,
        foodCategory: "Poultry",
        foodId: "food_ane1uw5amh8okda3qqu88bow58ul",
        image: "https://www.edamam.com/food-img/f53/f53de7dd1054370cdfd98e18ccf77dbe.jpg",
      },
    ],
    calories: 2325.38,
    totalCO2Emissions: 10600.38,
    co2EmissionsClass: "G",
    totalWeight: 1074,
    totalTime: 55,
    cuisineType: ["american"],
    mealType: ["lunch/dinner"],
    dishType: ["condiments and sauces"],
    totalNutrients: {
      ENERC_KCAL: {
        label: "Energy",
        quantity: 2325.38,
        unit: "kcal",
      },
      FAT: {
        label: "Fat",
        quantity: 174.156,
        unit: "g",
      },
      FASAT: {
        label: "Saturated",
        quantity: 47.5128,
        unit: "g",
      },
      FATRN: {
        label: "Trans",
        quantity: 0.7409,
        unit: "g",
      },
      FAMS: {
        label: "Monounsaturated",
        quantity: 72.334,
        unit: "g",
      },
      FAPU: {
        label: "Polyunsaturated",
        quantity: 36.4422,
        unit: "g",
      },
      CHOCDF: {
        label: "Carbs",
        quantity: 2.1346,
        unit: "g",
      },
      "CHOCDF.net": {
        label: "Carbohydrates (net)",
        quantity: 2.1346,
        unit: "g",
      },
      FIBTG: {
        label: "Fiber",
        quantity: 0,
        unit: "g",
      },
      SUGAR: {
        label: "Sugars",
        quantity: 0,
        unit: "g",
      },
      PROCNT: {
        label: "Protein",
        quantity: 176.522,
        unit: "g",
      },
      CHOLE: {
        label: "Cholesterol",
        quantity: 1018.12,
        unit: "mg",
      },
      NA: {
        label: "Sodium",
        quantity: 890.5799999999999,
        unit: "mg",
      },
      CA: {
        label: "Calcium",
        quantity: 88.94,
        unit: "mg",
      },
      MG: {
        label: "Magnesium",
        quantity: 200.2,
        unit: "mg",
      },
      K: {
        label: "Potassium",
        quantity: 2184.08,
        unit: "mg",
      },
      FE: {
        label: "Iron",
        quantity: 7.372,
        unit: "mg",
      },
      ZN: {
        label: "Zinc",
        quantity: 15.093,
        unit: "mg",
      },
      P: {
        label: "Phosphorus",
        quantity: 1672.42,
        unit: "mg",
      },
      VITA_RAE: {
        label: "Vitamin A",
        quantity: 281.41999999999996,
        unit: "µg",
      },
      VITC: {
        label: "Vitamin C",
        quantity: 1.3760000000000001,
        unit: "mg",
      },
      THIA: {
        label: "Thiamin (B1)",
        quantity: 0.7840199999999999,
        unit: "mg",
      },
      RIBF: {
        label: "Riboflavin (B2)",
        quantity: 1.52978,
        unit: "mg",
      },
      NIA: {
        label: "Niacin (B3)",
        quantity: 50.375600000000006,
        unit: "mg",
      },
      VITB6A: {
        label: "Vitamin B6",
        quantity: 3.52726,
        unit: "mg",
      },
      FOLDFE: {
        label: "Folate equivalent (total)",
        quantity: 39.1,
        unit: "µg",
      },
      FOLFD: {
        label: "Folate (food)",
        quantity: 39.1,
        unit: "µg",
      },
      FOLAC: {
        label: "Folic acid",
        quantity: 0,
        unit: "µg",
      },
      VITB12: {
        label: "Vitamin B12",
        quantity: 6.246,
        unit: "µg",
      },
      VITD: {
        label: "Vitamin D",
        quantity: 1.074,
        unit: "µg",
      },
      TOCPHA: {
        label: "Vitamin E",
        quantity: 2.3242000000000003,
        unit: "mg",
      },
      VITK1: {
        label: "Vitamin K",
        quantity: 23.93,
        unit: "µg",
      },
      WATER: {
        label: "Water",
        quantity: 719.7139999999999,
        unit: "g",
      },
    },
    totalDaily: {
      ENERC_KCAL: {
        label: "Energy",
        quantity: 116.269,
        unit: "%",
      },
      FAT: {
        label: "Fat",
        quantity: 267.93230769230775,
        unit: "%",
      },
      FASAT: {
        label: "Saturated",
        quantity: 237.564,
        unit: "%",
      },
      CHOCDF: {
        label: "Carbs",
        quantity: 0.7115333333333332,
        unit: "%",
      },
      FIBTG: {
        label: "Fiber",
        quantity: 0,
        unit: "%",
      },
      PROCNT: {
        label: "Protein",
        quantity: 353.04400000000004,
        unit: "%",
      },
      CHOLE: {
        label: "Cholesterol",
        quantity: 339.37333333333333,
        unit: "%",
      },
      NA: {
        label: "Sodium",
        quantity: 37.1075,
        unit: "%",
      },
      CA: {
        label: "Calcium",
        quantity: 8.894,
        unit: "%",
      },
      MG: {
        label: "Magnesium",
        quantity: 47.666666666666664,
        unit: "%",
      },
      K: {
        label: "Potassium",
        quantity: 46.469787234042556,
        unit: "%",
      },
      FE: {
        label: "Iron",
        quantity: 40.955555555555556,
        unit: "%",
      },
      ZN: {
        label: "Zinc",
        quantity: 137.20909090909092,
        unit: "%",
      },
      P: {
        label: "Phosphorus",
        quantity: 238.91714285714286,
        unit: "%",
      },
      VITA_RAE: {
        label: "Vitamin A",
        quantity: 31.268888888888885,
        unit: "%",
      },
      VITC: {
        label: "Vitamin C",
        quantity: 1.5288888888888892,
        unit: "%",
      },
      THIA: {
        label: "Thiamin (B1)",
        quantity: 65.335,
        unit: "%",
      },
      RIBF: {
        label: "Riboflavin (B2)",
        quantity: 117.6753846153846,
        unit: "%",
      },
      NIA: {
        label: "Niacin (B3)",
        quantity: 314.8475,
        unit: "%",
      },
      VITB6A: {
        label: "Vitamin B6",
        quantity: 271.3276923076923,
        unit: "%",
      },
      FOLDFE: {
        label: "Folate equivalent (total)",
        quantity: 9.775,
        unit: "%",
      },
      VITB12: {
        label: "Vitamin B12",
        quantity: 260.25,
        unit: "%",
      },
      VITD: {
        label: "Vitamin D",
        quantity: 7.16,
        unit: "%",
      },
      TOCPHA: {
        label: "Vitamin E",
        quantity: 15.494666666666667,
        unit: "%",
      },
      VITK1: {
        label: "Vitamin K",
        quantity: 19.941666666666666,
        unit: "%",
      },
    },
    digest: [
      {
        label: "Fat",
        tag: "FAT",
        schemaOrgTag: "fatContent",
        total: 174.156,
        hasRDI: true,
        daily: 267.93230769230775,
        unit: "g",
        sub: [
          {
            label: "Saturated",
            tag: "FASAT",
            schemaOrgTag: "saturatedFatContent",
            total: 47.5128,
            hasRDI: true,
            daily: 237.564,
            unit: "g",
          },
          {
            label: "Trans",
            tag: "FATRN",
            schemaOrgTag: "transFatContent",
            total: 0.7409,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
          {
            label: "Monounsaturated",
            tag: "FAMS",
            schemaOrgTag: null,
            total: 72.334,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
          {
            label: "Polyunsaturated",
            tag: "FAPU",
            schemaOrgTag: null,
            total: 36.4422,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
        ],
      },
      {
        label: "Carbs",
        tag: "CHOCDF",
        schemaOrgTag: "carbohydrateContent",
        total: 2.1346,
        hasRDI: true,
        daily: 0.7115333333333332,
        unit: "g",
        sub: [
          {
            label: "Carbs (net)",
            tag: "CHOCDF.net",
            schemaOrgTag: null,
            total: 2.1346,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
          {
            label: "Fiber",
            tag: "FIBTG",
            schemaOrgTag: "fiberContent",
            total: 0,
            hasRDI: true,
            daily: 0,
            unit: "g",
          },
          {
            label: "Sugars",
            tag: "SUGAR",
            schemaOrgTag: "sugarContent",
            total: 0,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
          {
            label: "Sugars, added",
            tag: "SUGAR.added",
            schemaOrgTag: null,
            total: 0,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
        ],
      },
      {
        label: "Protein",
        tag: "PROCNT",
        schemaOrgTag: "proteinContent",
        total: 176.522,
        hasRDI: true,
        daily: 353.04400000000004,
        unit: "g",
      },
      {
        label: "Cholesterol",
        tag: "CHOLE",
        schemaOrgTag: "cholesterolContent",
        total: 1018.12,
        hasRDI: true,
        daily: 339.37333333333333,
        unit: "mg",
      },
      {
        label: "Sodium",
        tag: "NA",
        schemaOrgTag: "sodiumContent",
        total: 890.5799999999999,
        hasRDI: true,
        daily: 37.1075,
        unit: "mg",
      },
      {
        label: "Calcium",
        tag: "CA",
        schemaOrgTag: null,
        total: 88.94,
        hasRDI: true,
        daily: 8.894,
        unit: "mg",
      },
      {
        label: "Magnesium",
        tag: "MG",
        schemaOrgTag: null,
        total: 200.2,
        hasRDI: true,
        daily: 47.666666666666664,
        unit: "mg",
      },
      {
        label: "Potassium",
        tag: "K",
        schemaOrgTag: null,
        total: 2184.08,
        hasRDI: true,
        daily: 46.469787234042556,
        unit: "mg",
      },
      {
        label: "Iron",
        tag: "FE",
        schemaOrgTag: null,
        total: 7.372,
        hasRDI: true,
        daily: 40.955555555555556,
        unit: "mg",
      },
      {
        label: "Zinc",
        tag: "ZN",
        schemaOrgTag: null,
        total: 15.093,
        hasRDI: true,
        daily: 137.20909090909092,
        unit: "mg",
      },
      {
        label: "Phosphorus",
        tag: "P",
        schemaOrgTag: null,
        total: 1672.42,
        hasRDI: true,
        daily: 238.91714285714286,
        unit: "mg",
      },
      {
        label: "Vitamin A",
        tag: "VITA_RAE",
        schemaOrgTag: null,
        total: 281.41999999999996,
        hasRDI: true,
        daily: 31.268888888888885,
        unit: "µg",
      },
      {
        label: "Vitamin C",
        tag: "VITC",
        schemaOrgTag: null,
        total: 1.3760000000000001,
        hasRDI: true,
        daily: 1.5288888888888892,
        unit: "mg",
      },
      {
        label: "Thiamin (B1)",
        tag: "THIA",
        schemaOrgTag: null,
        total: 0.7840199999999999,
        hasRDI: true,
        daily: 65.335,
        unit: "mg",
      },
      {
        label: "Riboflavin (B2)",
        tag: "RIBF",
        schemaOrgTag: null,
        total: 1.52978,
        hasRDI: true,
        daily: 117.6753846153846,
        unit: "mg",
      },
      {
        label: "Niacin (B3)",
        tag: "NIA",
        schemaOrgTag: null,
        total: 50.375600000000006,
        hasRDI: true,
        daily: 314.8475,
        unit: "mg",
      },
      {
        label: "Vitamin B6",
        tag: "VITB6A",
        schemaOrgTag: null,
        total: 3.52726,
        hasRDI: true,
        daily: 271.3276923076923,
        unit: "mg",
      },
      {
        label: "Folate equivalent (total)",
        tag: "FOLDFE",
        schemaOrgTag: null,
        total: 39.1,
        hasRDI: true,
        daily: 9.775,
        unit: "µg",
      },
      {
        label: "Folate (food)",
        tag: "FOLFD",
        schemaOrgTag: null,
        total: 39.1,
        hasRDI: false,
        daily: 0,
        unit: "µg",
      },
      {
        label: "Folic acid",
        tag: "FOLAC",
        schemaOrgTag: null,
        total: 0,
        hasRDI: false,
        daily: 0,
        unit: "µg",
      },
      {
        label: "Vitamin B12",
        tag: "VITB12",
        schemaOrgTag: null,
        total: 6.246,
        hasRDI: true,
        daily: 260.25,
        unit: "µg",
      },
      {
        label: "Vitamin D",
        tag: "VITD",
        schemaOrgTag: null,
        total: 1.074,
        hasRDI: true,
        daily: 7.16,
        unit: "µg",
      },
      {
        label: "Vitamin E",
        tag: "TOCPHA",
        schemaOrgTag: null,
        total: 2.3242000000000003,
        hasRDI: true,
        daily: 15.494666666666667,
        unit: "mg",
      },
      {
        label: "Vitamin K",
        tag: "VITK1",
        schemaOrgTag: null,
        total: 23.93,
        hasRDI: true,
        daily: 19.941666666666666,
        unit: "µg",
      },
      {
        label: "Sugar alcohols",
        tag: "Sugar.alcohol",
        schemaOrgTag: null,
        total: 0,
        hasRDI: false,
        daily: 0,
        unit: "g",
      },
      {
        label: "Water",
        tag: "WATER",
        schemaOrgTag: null,
        total: 719.7139999999999,
        hasRDI: false,
        daily: 0,
        unit: "g",
      },
    ],
  });

  const [pageState, setPageState] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const { id } = useParams();
  let isFirst = true;
  async function fetchRecipe() {
    setPageState(PAGESTATE.LOADING);
    const options = {
      method: "GET",
      url: `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=da84d3cb&app_key=07766072aed6038895f0acbed0418547`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("recipeeee", response);
      setPageState(PAGESTATE.SUCCESS);
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      setPageState(PAGESTATE.ERROR);
    }
  }

  useEffect(() => {
    if (id !== null && id !== "" && id !== undefined && isFirst) {
      isFirst = false;
      fetchRecipe();
    }
  }, [id]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <RecipeContainer>
      {pageState === PAGESTATE.LOADING ? (
        <div>
          <Loader />
        </div>
      ) : pageState === PAGESTATE.ERROR ? (
        <div>Something went wrong! We&apos;re working on it</div>
      ) : PAGESTATE.SUCCESS ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full my-6">
            <Link to={"/"} className="flex w-fit gap-2 justify-center items-center font-bold underline text-blue-950 ">
              <Img src="./goback.png" />
              Go back
            </Link>
            <RecipeTitle>{recipe.label}</RecipeTitle>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-24">
            <div className="sm:self-start self-center">
              <p className="mb-5 font-bold">
                Source : <span className="underline">{recipe.source}</span>
              </p>
              {imageLoading && <Skeleton count={1} width={"500px"} height={"500px"} />}
              {<RecipeImage src={recipe.image} alt={recipe.title} onLoad={handleImageLoad} style={{ display: `${imageLoading} ? "none" : "block"` }} />}
            </div>

            <div>
              <Ingredients>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div className="flex gap-5 mb-5" key={index}>
                      {imageLoading && <Skeleton count={1} width={"40px"} height={"40px"} baseColor="grey" />} {<img src={ingredient.image} onLoad={handleImageLoad} style={{ display: `${imageLoading} ? "none" : "block"` }} />}
                      <li key={index}>{ingredient.text}</li>
                    </div>
                  ))}
                </ul>
              </Ingredients>
              <Instructions>
                <h3>Cooking Instructions:</h3>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Full Instructions
                </a>
              </Instructions>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>No recipe matched your search query!!</h3>
        </div>
      )}
    </RecipeContainer>
  );
}

// Container for the entire Recipe component
const RecipeContainer = styled.div`
  width: 85%;
  margin: auto;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Recipe title
const RecipeTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  text-shadow: 1px 1px grey;
  margin: 5px 0;
  text-align: center;
  position: relative;
  flex-grow: 1;
`;

// Image section
const RecipeImage = styled.img`
  max-width: 500px;
  border-radius: 10px;
  object-fit: cover;
`;

// Ingredients section
const Ingredients = styled.div`
  margin-bottom: 2rem;
  h3 {
    font-size: 24px;
    color: #555;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;

    li {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
      width: 180px;
    }
    img {
      width: 50px;
      border-radius: 5px;
    }
  }
`;

// Instructions section
const Instructions = styled.div`
  text-align: center;

  a {
    font-size: 18px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Go Back Arrow Image
const Img = styled.img`
  self-align: start;
  height: 16px;
`;
