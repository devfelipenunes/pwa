import { useEffect, useState } from "react";
import api from "../services/api";
import { set, get, keys, del, clear } from "idb-keyval";
import { CardCreate } from "../components/CardCreate";
import { Menu } from "../components/Menu";

interface Form {
  id: string;
  title: string;
  observation: string;
  check: boolean | string;
  // form: FormItem[];
  photos?: string[];
  regulation_text: {
    id: string;
    text: string;
    regulationsubitem: {
      description_subitem: string;
      regulationitem: {
        name_item: string;
        regulation: any;
      };
    };
  };
  isSaved?: string | undefined;
}

export function Create() {
  const [hasSavedForm, setHasSavedForm] = useState(false);
  const [form, setForm] = useState<Form[]>([]);
  const [data, setData] = useState<Form[]>([]);
  const [savedForm, setSavedForm] = useState<Form[]>([]);
  const originalForm: Form[] = form;

  async function getData() {
    const savedForm = await getSavedForm();
    if (savedForm.length !== 0) {
      const newForm = savedForm.filter(Boolean);
      if (newForm.length > 0) {
        const updatedForm = updateForm(newForm);
        setForm(updatedForm);
        if (navigator.onLine) {
          await postFormData(updatedForm);
          await checkIfAllOnline(updatedForm);
        }
      }
    } else {
      getFormDataFromApi();
    }
  }

  async function getSavedForm() {
    return await Promise.all(form.map((_, index) => get(`Form-${index}`)));
  }

  async function checkIfAllOnline(updatedForm: Form[]) {
    const allHaveIsSaved = updatedForm.every((item) =>
      item.hasOwnProperty("isSaved")
    );
    console.log("all have is saved", allHaveIsSaved);
    if (allHaveIsSaved) {
      const allOnline = updatedForm.every((item) => item.isSaved === "online");
      console.log("update form", updatedForm);
      console.log(" all online", allOnline);
      if (allOnline) {
        await clear();
        console.log("Apaguei!");
        alert("All online");
        getFormDataFromApi();
      }
    }
  }

  function updateForm(newForm: Form[]) {
    return form.map((item) => {
      const savedItem = newForm.find((i) => i.id === item.id);
      return savedItem ? { ...item, ...savedItem } : item;
    });
  }

  async function postFormData(updatedForm: Form[]) {
    const hasOfflineItems = updatedForm.some(
      (item) => item.isSaved === "offline"
    );
    if (hasOfflineItems) {
      const formData = new FormData();
      updatedForm.forEach((item) => {
        if (item.isSaved === "offline") {
          formData.append("check", item.check);
          formData.append("observation", item.observation);
          if (Array.isArray(item.photos)) {
            item.photos.forEach((photo) => {
              formData.append("photos", photo);
            });
          }
          // formData.append("photos", item.photos);
        }
      });
      await api.post(
        "/checklist/inspection/saveitem/d501441c-51bf-4a4f-a7ca-581b7f6ddf52",
        formData
      );
      const newForm = updatedForm.map((item) => {
        if (item.isSaved === "offline") {
          return { ...item, isSaved: "online" };
        }
        return item;
      });
      setForm(newForm);

      newForm.forEach((item, index) => {
        set(`Form-${index}`, item);
      });

      getData();
    }
  }

  function getFormDataFromApi() {
    api
      .get("/checklist/inspection/d501441c-51bf-4a4f-a7ca-581b7f6ddf52")
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleClearData() {
    await clear();
    setSavedForm([]);
  }

  async function handleSaveQuestion(index: any): Promise<void> {
    const newForm: Form[] = [...form];
    newForm[index] = form[index];
    setForm(newForm);
    newForm[index].isSaved = "offline";
    await set(`Form-${index}`, form[index]);
    getData();
  }

  const handleCapture = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const newForm = [...form];
      if (!newForm[index].photos) {
        newForm[index].photos = [];
      }
      for (let i = 0; i < event.target.files.length; i++) {
        newForm[index].photos!.push(URL.createObjectURL(event.target.files[i]));
      }
      setForm(newForm);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Menu>
      <div>
        <button onClick={handleClearData}>limpar</button>
        {form?.map((data, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={data.id}
          >
            <CardCreate
              key={data.id}
              text={data?.regulation_text?.text}
              description_subitem={
                data?.regulation_text?.regulationsubitem?.description_subitem
              }
              regulation={
                data?.regulation_text?.regulationsubitem?.regulationitem
                  ?.regulation?.regulation
              }
              observation={data.observation}
              observationChange={(e) => {
                const newForm = [...form];
                newForm[index].observation = e.target.value;
                setForm(newForm);
              }}
              check={data?.check}
              checkChange={(e) => {
                const newForm = [...form];
                newForm[index].check = e.target.checked;
                setForm(newForm);
              }}
              // photos={data?.photos}
              imageChange={(e) => handleCapture(e, index)}
              onClick={() => handleSaveQuestion(index)}
              // isSaved={!!data.isSaved}
              isSaved={data.isSaved}
            />

            <div className="flex-container">
              {form[index].photos &&
                form[index].photos!.length > 0 &&
                form[index].photos!.map((photosUrl, i) => (
                  <img
                    key={i}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    src={photosUrl}
                    alt={`captured-${i}`}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </Menu>
  );
}
