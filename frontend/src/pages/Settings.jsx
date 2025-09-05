import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/UI/InputField";
import Navbar from "../components/UI/Navbar";

export default function Settings() {
  const navigate = useNavigate();
  const { user: authUser, logout, deleteAccount, updateAccount } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    current_password: "",
    password: "",
    password_confirmation: ""
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        if (authUser) {
          if (!mounted) return;
          setForm(f => ({
            ...f,
            name: authUser.name || "",
            email: authUser.email || ""
          }));
          setLoading(false);
          return;
        }

        const res = await axios.get("/user");
        if (!mounted) return;
        setForm(f => ({
          ...f,
          name: res.data.name || "",
          email: res.data.email || ""
        }));
      } catch (err) {
        navigate("/login", { replace: true });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [authUser, navigate]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setErrors({});

    if (form.password && form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: "Lozinke se ne poklapaju." });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name,
        email: form.email
      };
      if (form.password) {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
        payload.current_password = form.current_password;
      }

      const result = await updateAccount(payload);
      if (result.success) {
        setForm(f => ({ ...f, password: "", password_confirmation: "", current_password: "", name: result.user.name, email: result.user.email }));
        setMessage("Podaci su uspešno sačuvani.");
        setErrors({});
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setMessage(result.message || "Neuspešno ažuriranje.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  async function handleDelete() {
    if (!window.confirm("Da li ste sigurni da želite da obrišete nalog? Ova akcija je nepovratna.")) return;
    try {
      await deleteAccount();
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Brisanje naloga nije uspelo.");
      }
    }
  }

  if (loading) return <div className="p-6">Učitavanje...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-20">
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Podešavanja naloga</h1>

          {message && (
            <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800">
              {message}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <InputField label="Ime" name="name" value={form.name} onChange={onChange} required />
            {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}

            <InputField label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}


            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-44 text-sm text-gray-700">Trenutna lozinka</div>
                <div className="flex-1">
                  <input
                    name="current_password"
                    type="password"
                    value={form.current_password}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Unesite trenutnu lozinku"
                  />
                  {errors.current_password && <div className="text-sm text-red-600 mt-1">{errors.current_password}</div>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-44 text-sm text-gray-700">Nova lozinka</div>
                <div className="flex-1">
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Unesite novu lozinku"
                  />
                  {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-44 text-sm text-gray-700">Potvrdi novu lozinku</div>
                <div className="flex-1">
                  <input
                    name="password_confirmation"
                    type="password"
                    value={form.password_confirmation}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Ponovo unesite novu lozinku"
                  />
                  {errors.password_confirmation && <div className="text-sm text-red-600 mt-1">{errors.password_confirmation}</div>}
                </div>
              </div>
            </div>

            {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
            {errors.password_confirmation && <div className="text-sm text-red-600">{errors.password_confirmation}</div>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Čuvanje..." : "Sačuvaj promene"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Nazad
              </button>
            </div>
          </form>

          <hr className="my-6" />

          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-medium">Bezbednost</div>
              <div className="text-sm text-gray-600">Odjavite se ili obrišite nalog.</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Obriši nalog
              </button>

              <button
                onClick={handleLogout}
                className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Odjavi se
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}